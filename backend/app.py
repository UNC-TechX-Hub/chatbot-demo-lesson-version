# builtin

# external
from fastapi import FastAPI

# internal
from src.io import ChatOutput, ChatInput
from src.chatGpt import chat

app: FastAPI = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.post("/chat")
async def chat_endpoint(input: ChatInput) -> ChatOutput:
    print(f"Received input: {input}")
    output: ChatOutput = chat(input)
    return output