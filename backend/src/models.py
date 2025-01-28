# builtin
from enum import Enum

# external
from pydantic import BaseModel

class Role(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"

# TODO: Create a Message model
    
# TODO: Create a Messages model
