import functools

from flask import request
from voluptuous.error import Error as VoluptuousError



class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv


def json_schema(schema):
    def decorator(f):
        @functools.wraps(f)
        def wrapper(*args, **kwargs):
            try:
                data = schema(request.data)
                # TODO: add debug logging
                return f(data, *args, **kwargs)
            except VoluptuousError as e:
                raise InvalidUsage(message=str(e))
        return wrapper
    return decorator