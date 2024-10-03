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

async def chat(messages: ChatInput) -> ChatOutput:
    completion = await client.chat.completions.create(
        model="gpt-4",  
        messages=messages.messages
    )
    returnMessage: Message = Message(
        role=Role.ASSISTANT,
        content=completion.choices[0].message.content
    )
    return ChatOutput(message=returnMessage)
