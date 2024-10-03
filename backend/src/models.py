# builtin
from enum import Enum

# external
from pydantic import BaseModel

class Role(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"

class Message(BaseModel):
    role: Role
    content: str
    

class Messages(BaseModel):
    messages: list[Message]