import random

class UserHandler:
    def __init__(self, user_service):
        self.user_service = user_service

    def generate_otp(self):
        return random.randint(111111, 999999)


