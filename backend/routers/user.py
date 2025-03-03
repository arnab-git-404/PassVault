from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from models.user import User, UserLogin, SendOTPRequest,TwoFactorAuth ,VerifyTwoFactorAuth, VerifyOTP
from models.user import ResetPassword, UserInfo
from config import collection, collection_googleSignIn
from bson.objectid import ObjectId
from services.user import UserHandler
import redis
import pyotp
import qrcode
from io import BytesIO
import base64
from datetime import datetime, timedelta
from jose import JWTError, jwt , ExpiredSignatureError
from fastapi import Depends, Cookie
from fastapi import Header
from fastapi import HTTPException, Header





router = APIRouter()
user_handler = UserHandler(collection)

# Connect to Redis (make sure Redis is running)
r = redis.StrictRedis(host='localhost', port=6379, db=0, decode_responses=True)

OTP_EXPIRY_TIME = 60 * 5  # OTP expires after 5 minutes (300 seconds)

SECRET_KEY = "6006"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30



def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt



@router.post("/send-otp")
async def send_otp(user: SendOTPRequest):
    # Generate OTP
    otp = user_handler.generate_otp()
    
    # Store OTP in Redis with an expiry time of 5 minutes
    res = r.setex(user.email, OTP_EXPIRY_TIME, otp)  # OTP will expire after 5 minutes
    
    return JSONResponse(content={"status_code": 200, "message": "OTP sent successfully. Please verify it.", "result": res, "otp": otp})

@router.post("/verify-otp")
async def verify_otp(user: VerifyOTP):
    # Get OTP from Redis for email verification
    otp_from_redis = r.get(user.email)

    if not otp_from_redis:
        return JSONResponse(content={"status_code": 400, "message": "OTP has expired. Please request a new OTP."})

    if int(user.otp) == int(otp_from_redis):
        return JSONResponse(content={"status_code": 200, "message": "OTP Verified successfully. Proceed to signup."})
    else:
        return JSONResponse(content={"status_code": 400, "message": "Invalid OTP. Please try again."})


@router.post("/signup")
async def create_user(user: User):
    # Get OTP from Redis for email verification

    try:
        otp_from_redis = r.get(user.email)
    
        # print(otp_from_redis)

        existing_user = collection.find_one({"email": user.email})

        if not otp_from_redis:
            return JSONResponse(content={"status_code": 400, "message": "OTP has expired. Please request a new OTP."})

        if existing_user:
            return JSONResponse(content={"status_code": 400, "message": "User already exists. Please use a different email."})


        if int(user.otp) == int(otp_from_redis):
            # OTP matched, save user to database
            user.otp = otp_from_redis
            user.isVerified = True
            
            collection.insert_one(dict(user))
            created_user = collection.find_one({"email": user.email})
            user_id = str(created_user["_id"])
            r.delete(user.email)
            

            userDataFromDB = UserInfo(
            userId=user_id, name=created_user["name"], email=created_user["email"], isVerified=created_user["isVerified"], is_2FA_Enabled=created_user["is_2FA_Enabled"],
            is_google_user=created_user["is_google_user"], profile_picture=str(created_user["profile_picture"])
            )

            # print(userDataFromDB)
            # Create access token
            access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            access_token = create_access_token(data={"email": user.email, "id": user_id}, expires_delta=access_token_expires)


            response = JSONResponse(content={"status_code": 200, "token": access_token, "message": "User created successfully", "user": userDataFromDB.dict()})
            response.set_cookie(key="access_token", value=f"Bearer {access_token}", httponly=True, secure=True, max_age=ACCESS_TOKEN_EXPIRE_MINUTES)
            return response
        

        else:
            return JSONResponse(content={"status_code": 400, "message": "Invalid OTP. Please try again."})

    except Exception as e:
        return JSONResponse(content={"status_code": 500, "message": "Internal Server Error", "error": str(e)})


@router.post("/signin")
async def signin_user(user: UserLogin):

    try:
        existing_user = collection.find_one({"email": user.email})

        if not existing_user:
            return JSONResponse(content={"status_code": 404, "message": "User not found"})

        if existing_user["password"] != user.password:
            return JSONResponse(content={"status_code": 401, "message": "Invalid password"})

        created_user = collection.find_one({"email": user.email})
        user_id = str(created_user["_id"])


        userDataFromDB = UserInfo(
            userId=user_id, name=created_user["name"], email=created_user["email"], isVerified=created_user["isVerified"], is_2FA_Enabled=created_user["is_2FA_Enabled"],
            is_google_user=created_user["is_google_user"], profile_picture=str(created_user["profile_picture"])
        )


        # Create access token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(data={"email": user.email, "id": str(existing_user["_id"]) }, expires_delta=access_token_expires)

        response = JSONResponse(content={"status_code": 200, "token": access_token, "message": "User Logged In Successfully", "user": userDataFromDB.dict()})
        response.set_cookie(key="access_token", value=f"Bearer {access_token}", httponly=True, secure=True, max_age=ACCESS_TOKEN_EXPIRE_MINUTES)
        
        return response
    
    except Exception as e:
        raise HTTPException(status_code=500, detail="Unable to Sign In User",)



@router.get("/")
async def get_all_users():
    users = collection.find()
    user_list = []
    for user in users:
        user["_id"] = str(user["_id"])
        user_list.append(user)
    return JSONResponse(content={"status_code": 200, "users": user_list})






def get_current_user(authorization: str = Header(None)):

    if authorization is None:
        raise HTTPException(status_code=400, detail="Authorization header is missing")
    
    try:
        # Assuming the token starts with "Bearer "
        token = authorization.split(" ")[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        user_email = payload.get("email")
        
        if user_email is None:
            raise HTTPException(status_code=400, detail="Token does not contain email")

        return user_email
    
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired. Please log in again.")
    
    except JWTError:
        raise HTTPException(status_code=404, detail="Not authenticated")
    
    except Exception as e:
        # Catching any other unexpected errors
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")













@router.get("/user-info")
async def get_user_info(current_user: str = Depends(get_current_user)):

    user = collection.find_one({"email": current_user})

    if not user:
        # raise HTTPException(status_code=404, detail="User not found")
        return JSONResponse(content={"status_code": 404, "message": "User not found"})
    
    userDataFromDB = UserInfo(
            userId=str(user["_id"]), name=user["name"], email=user["email"], isVerified=user["isVerified"], is_2FA_Enabled=user["is_2FA_Enabled"],
            profile_picture= str(user["profile_picture"]), is_google_user=user["is_google_user"])


    # user["_id"] = str(user["_id"])
    return JSONResponse(content={"status_code": 200, "user": userDataFromDB.dict()})














@router.get("/{user_id}")
async def get_user_info(user_id: str):
    
    try:
        # Validate ObjectId
        if not ObjectId.is_valid(user_id):
            raise HTTPException(status_code=400, detail="Invalid user ID format")

        user = collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user["_id"] = str(user["_id"])
        return JSONResponse(content={"status_code": 200, "user": user})
    except Exception as e:
        raise HTTPException(status_code=500, detail="Unable to Get User Data")






@router.post('/2fa/enable')
async def enable_2fa(user: TwoFactorAuth):

    existing_user = collection.find_one({"email": user.email})

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Generate a secret key for 2FA
    secret = pyotp.random_base32()
    existing_user["_2fa_secret"] = secret
    collection.update_one({"email": user.email}, {"$set": existing_user})

    # Generate a QR code for the secret
    totp = pyotp.TOTP(secret)
    uri = totp.provisioning_uri(user.email, issuer_name="PassVault")
    qr = qrcode.make(uri)
    buf = BytesIO()
    qr.save(buf, format='PNG')
    qr_code = base64.b64encode(buf.getvalue()).decode('utf-8')

    return JSONResponse(content={"status_code": 200,"qrCode": f"data:image/png;base64,{qr_code}"})







@router.post('/2fa/verify')
async def verify_2fa(user: VerifyTwoFactorAuth):
    existing_user = collection.find_one({"email": user.email})

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    if "_2fa_secret" not in existing_user:
        raise HTTPException(status_code=400, detail="2FA is not enabled for this user")


    totp = pyotp.TOTP(existing_user["_2fa_secret"])


    if totp.verify(user.verification_code):
        existing_user["is_2FA_Enabled"] = True
        collection.update_one({"email": user.email}, {"$set": existing_user})
        return JSONResponse(content={ "status_code": 200, "message": "2FA verification successful"})
    else:
        return JSONResponse(content={"status_code": 400, "message": "Invalid 2FA code"})














@router.post('/reset-password')
async def reset_password(user: ResetPassword):
    existing_user = collection.find_one({"email": user.email})

    otp_from_redis = r.get(user.email)

    if user.otp != otp_from_redis:
        return JSONResponse(content={"status_code": 400, "message": "Invalid OTP. Please try again."})

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    if existing_user["password"] != user.newPassword:
        collection.update_one({"email": user.email}, {"$set": {"password": user.newPassword}})
        return JSONResponse(content={ "status_code": 200, "message": "Password reset successful"})
    else:
        return JSONResponse(content={"status_code": 400, "message": "New password must be different from the old one."})
