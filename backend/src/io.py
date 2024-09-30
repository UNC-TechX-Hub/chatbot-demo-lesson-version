from .models import Message
from pydantic import BaseModel

class ChatInput(BaseModel):
    messages: list[Message]

class ChatOutput(BaseModel):
    message: Message