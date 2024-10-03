# builtin
import os

# external
from fastapi import FastAPI
from contextlib import asynccontextmanager
from openai import AsyncOpenAI

# internal
from src.io import ChatOutput, ChatInput
from src.response import chat

ml_models = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    ml_models["chat"] = chat

    yield
    
    ml_models.clear()


app: FastAPI = FastAPI(lifespan=lifespan)

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.post("/chat")
async def chat_endpoint(input: ChatInput) -> ChatOutput:
    print(f"Received input: {input}")
    output: ChatOutput = await ml_models["chat"](input)
    return output
