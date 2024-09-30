# builtin
from enum import Enum

# external
from pydantic import BaseModel

class Role(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"

class Message(BaseModel):
    content: str
    role: Role
