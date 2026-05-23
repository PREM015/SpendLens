from typing import Any, Dict, Optional
from fastapi import HTTPException, status


class CredexException(Exception):
    pass


class NotFoundException(CredexException):
    def __init__(self, item_name: str, item_id: Any):
        self.item_name = item_name
        self.item_id = item_id
        super().__init__(f"{item_name} with id {item_id} not found")


class AlreadyExistsException(CredexException):
    def __init__(self, item_name: str, field: str, value: Any):
        self.item_name = item_name
        self.field = field
        self.value = value
        super().__init__(f"{item_name} with {field}={value} already exists")


class ValidationException(CredexException):
    def __init__(self, detail: str):
        self.detail = detail
        super().__init__(detail)
