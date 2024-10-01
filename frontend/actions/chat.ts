"use server";

import { Message } from "../schema";

async function chat(messages: Message[]) {
    const response = await fetch(`http://localhost:8000/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({messages: messages})
    })
    if (!response.ok) {
        throw new Error("Failed to fetch chat response");
    }
    const data = await response.json();
    return data;
}

export default chat;