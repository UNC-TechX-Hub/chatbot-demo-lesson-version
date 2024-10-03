import { z } from "zod";

export const messageSchema = z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string()
});

/*
class Message(BaseModel):
    content: str
    role: Role
*/

export type Message = z.infer<typeof messageSchema>;

export const chatInputSchema = z.object({
    messages: z.array(messageSchema) // messages: list[Message]
});

/*
class ChatInput(BaseModel):
    messages: list[Message]
*/

export type ChatInput = z.infer<typeof chatInputSchema>;

export const chatOutputSchema = z.object({
    message: messageSchema
});

/*
class ChatOutput(BaseModel):
    message: Message
*/

export type ChatOutput = z.infer<typeof chatOutputSchema>;


export const messagesSchema = z.array(messageSchema);

export type Messages = z.infer<typeof messagesSchema>;
