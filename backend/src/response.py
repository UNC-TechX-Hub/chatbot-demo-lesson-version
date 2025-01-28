# builtin
from dotenv import load_dotenv
import os

# external
from openai import AsyncOpenAI

# internal
from .models import Role, Message
from .io import ChatOutput, ChatInput

load_dotenv()

client: AsyncOpenAI = AsyncOpenAI(
  api_key=os.getenv("OPENAI_API_KEY")
)

# TODO: Implement the chat function