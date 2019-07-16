from flask import request, abort
from functools import wraps
from typing import List
from config import SKILLHUB_API_KEY

def api_key_authentication(api_keys: List[str] = [SKILLHUB_API_KEY], header: str = "x-api-key"):
    def wrapper(func):
        @wraps(func)
        def decorated_function(*args, **kwargs):
            if request.headers.get(header) and request.headers.get(header) in api_keys:
                return func(*args, **kwargs)
            else:
                abort(401)

        return decorated_function

    return wrapper
