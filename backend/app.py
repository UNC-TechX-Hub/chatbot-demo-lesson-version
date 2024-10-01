# builtin

# external
from fastapi import FastAPI

# internal
from src.io import ChatOutput
from src.chatGpt import chat
from src.models import Messages

app: FastAPI = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.post("/chat")
async def chat_endpoint(input: Messages) -> ChatOutput:
    output = await chat(input)
    return output