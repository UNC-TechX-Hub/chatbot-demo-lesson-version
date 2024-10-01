# builtin

# external
from fastapi import FastAPI

# internal
from src.io import ChatInput, ChatOutput
from src.models import Message, Role

app: FastAPI = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.post("/chat")
def chat(input: ChatInput) -> ChatOutput:
    return ChatOutput(message=Message(content="Hello, World!", role=Role.ASSISTANT))