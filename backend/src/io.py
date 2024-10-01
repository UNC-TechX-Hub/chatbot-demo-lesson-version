# external
from pydantic import BaseModel

# internal
from .models import Message

class ChatInput(BaseModel):
    messages: list[Message]

class ChatOutput(BaseModel):
    message: Message
