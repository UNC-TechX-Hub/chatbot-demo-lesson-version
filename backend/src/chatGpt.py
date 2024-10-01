# builtin
import os

# external
import openai

# internal
from .models import Messages
from .io import ChatOutput

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY not found in environment variables")

client: openai.OpenAI = openai.OpenAI(api_key=api_key)

def chat(messages: Messages) -> ChatOutput:
    message: str = messages.messages[0].content if len(messages.messages) > 0 else ""
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": message}
        ]
    )
    return ChatOutput(message=completion.choices[0].message.content)