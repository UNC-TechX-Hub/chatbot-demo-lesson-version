"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { messageSchema, Message, chatInputSchema, ChatInput, chatOutputSchema, ChatOutput } from "@/schema";
import  chat from "@/actions/chat";

function UserMessage({ content }: { content: string }) {
  return <div className="bg-blue-500 text-white p-2 rounded-md">{content}</div>;
}

function AssistantMessage({ content }: { content: string }) {
  return <div className="bg-gray-200 text-black p-2 rounded-md">{content}</div>;
}

function MessageListItem({ message }: { message: Message }) {
  return <div>{message.role === "user" ? <UserMessage content={message.content} /> : <AssistantMessage content={message.content} />}</div>;
}

function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div>
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
    let currentMessages: Message[] = messages;
  
    if (inputValue.trim() === "") {
      console.error("No input to send.");
      return;
    }
  
    const newMessage = messageSchema.parse({ content: inputValue, role: "user" });
    currentMessages = [...currentMessages, newMessage];
  
    try {
      // Validate and log the data before sending it
      const chatInput = chatInputSchema.parse({ messages: currentMessages });
      console.log("Sending to backend:", chatInput);  // Log the input
  
      // Make the request
      const botResponse = await chat(chatInput);
      const botMessage = chatOutputSchema.parse(botResponse);
      setMessages([...currentMessages, botMessage.message]);
    } catch (error) {
      console.error("Failed to fetch chat response:", error);
    }
  
    setInputValue("");
  };
  
  return (
    <div>
      <MessageList messages={messages} />
      <Input placeholder="Type your message here..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <Button onClick={handleSend}>Send</Button>
    </div>
  );
}
