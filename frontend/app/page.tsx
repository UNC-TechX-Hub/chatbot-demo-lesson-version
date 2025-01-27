"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  messageSchema,
  Message,
  chatInputSchema,
  ChatInput,
  chatOutputSchema,
  ChatOutput,
} from "@/schema";
import chat from "@/actions/chat";

function UserMessage({ content }: { content: string }) {
  return (
    <div className="bg-blue-500 text-white p-3 rounded-lg max-w-sm self-end shadow-md">
      {content}
    </div>
  );
}

function AssistantMessage({ content }: { content: string }) {
  return (
    <div className="bg-gray-200 text-black p-3 rounded-lg max-w-sm self-start shadow-md">
      {content}
    </div>
  );
}

function MessageListItem({ message }: { message: Message }) {
  return (
    <div className="flex flex-col mb-3">
      {message.role === "user" ? (
        <UserMessage content={message.content} />
      ) : (
        <AssistantMessage content={message.content} />
      )}
    </div>
  );
}

function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto max-h-[70vh]">
      {messages.map((message, index) => (
        <MessageListItem key={index} message={message} />
      ))}
    </div>
  );
}

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async () => {
    if (inputValue.trim() === "") {
      console.error("No input to send.");
      return;
    }

    let currentMessages: Message[] = [...messages];

    const newMessage: Message = messageSchema.parse({
      content: inputValue,
      role: "user",
    });
    currentMessages.push(newMessage);

    try {
      const chatInput: ChatInput = chatInputSchema.parse({
        messages: currentMessages,
      });

      const botResponse: ChatOutput = await chat(chatInput);
      const botMessage: Message = chatOutputSchema.parse(botResponse).message;

      setMessages([...currentMessages, botMessage]);
    } catch (error) {
      console.error("Failed to fetch chat response:", error);
    }

    setInputValue("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Window */}
      <div className="flex-1 p-4 bg-white shadow-lg rounded-md m-4 overflow-hidden">
        <MessageList messages={messages} />
      </div>

      {/* Input Section */}
      <div className="p-4 bg-gray-200 flex items-center gap-2 border-t border-gray-300">
        <Input
          placeholder="Type your message here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 p-3 rounded-md shadow-sm"
        />
        <Button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md">
          Send
        </Button>
      </div>
    </div>
  );
}