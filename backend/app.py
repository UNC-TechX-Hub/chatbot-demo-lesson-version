# external
from fastapi import FastAPI
from contextlib import asynccontextmanager

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

# TODO: Add a route to the root URL that returns a message

# TODO: Add a route to the /chat URL that accepts a POST request with a ChatInput body and returns a ChatOutput body