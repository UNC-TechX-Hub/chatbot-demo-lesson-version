# builtin
from dotenv import load_dotenv
import os

# external
from openai import OpenAI
# internal
from .models import Role, Message
from .io import ChatOutput, ChatInput

load_dotenv()

client: OpenAI = OpenAI(
  api_key=os.getenv("OPENAI_API_KEY")
)

def chat(messages: ChatInput) -> ChatOutput:
    completion = client.chat.completions.create(
        model="gpt-4o-mini",  
        messages=messages.messages
    )
    returnMessage: Message = Message(
        role=Role.ASSISTANT,
        content=completion.choices[0].message.content
    )
    return ChatOutput(message=returnMessage)
