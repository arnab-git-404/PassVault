from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from models.password import SavedPassword, ShowAllPasswords, PasswordItem , DeletePasswordRequest,UpdatePasswordRequest
from config import collection_password
from bson.objectid import ObjectId

router = APIRouter()

@router.post("/save-password")
async def save_password(password_item: PasswordItem):
    
    existing_user = collection_password.find_one({"email": password_item.email})

    try:
        if existing_user:

            password_item.id = str(ObjectId())
            collection_password.update_one(
                {"email": password_item.email},
                {"$push": {"passwords": password_item.dict()}}
            )
            return JSONResponse(content={"status_code": 200, "message": "Password saved successfully"})
        else:
            new_user = SavedPassword(
                email=password_item.email,
                passwords=[password_item]  
            )
            collection_password.insert_one(new_user.dict())  
            
            return JSONResponse(content={"status_code": 200, "message": "Password saved successfully"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/show-passwords/{email}")
async def show_passwords(email: str):

    existing_user = collection_password.find_one({"email": email})

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")


    try:
        passwords = collection_password.find({"email": email})

        password_list = []
        for password in passwords:
            password["_id"] = str(password["_id"])
            password_list.append(password)

        return JSONResponse(content={"status_code": 200, "passwords": password_list})
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/update-password")
async def update_password(request: UpdatePasswordRequest):

    if not request.email:
        raise HTTPException(status_code=400, detail="Email is required")
    elif not request.password_id:
        raise HTTPException(status_code=400, detail="Password ID is required")
    elif not request.password:
        raise HTTPException(status_code=400, detail="Password is required")
    
    try:

        result = collection_password.update_one(
            {"email": request.email , "passwords.id": request.password_id},

            {"$set": {"passwords.$.password": request.password}}
        )
    
        print(result)

        if not ObjectId.is_valid(request.password_id):
            raise HTTPException(status_code=400, detail="Invalid password ID format")
        
        elif result.matched_count == 0:
            raise HTTPException(status_code=404, detail="User not found")
        
        elif result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Failed to update password")

        return JSONResponse(content={"status_code": 200, "message": "Password updated successfully"})
    
    except Exception as e:
        raise HTTPException(status_code=500, detail="Check UpdatePassword Route:"+str(e))



@router.delete("/delete-password")
async def delete_password(request: DeletePasswordRequest):
    if not request.email:
        raise HTTPException(status_code=400, detail="Email is required")
    elif not request.password_id:
        raise HTTPException(status_code=400, detail="Password ID is required")
    
    result = None  # Initialize result to None
    
    try:
  
        # Execute the database operation
        result = collection_password.update_one(
            {"email": request.email},
            {"$pull": {"passwords": {"id": request.password_id}}}
        )
      # Validate the password ID format first
        if not isinstance(request.password_id, str) or not request.password_id.strip():
            raise HTTPException(status_code=400, detail="Invalid password ID format")
        
        if not ObjectId.is_valid(request.password_id):
            raise HTTPException(status_code=400, detail="Invalid password ID format")        
        elif not result:
            raise HTTPException(status_code=404, detail="Password not found")

        
        print(result)

        # Check results after the operation
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="User not found")
        elif result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Password not found or already deleted")
    
        return JSONResponse(content={"status_code": 200, "message": "Password deleted successfully"})
    
    except Exception as e:
        raise HTTPException(status_code=500, detail="Check DeletePassWord Route:"+str(e))