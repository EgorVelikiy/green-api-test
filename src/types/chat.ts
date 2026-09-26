export type MessageDirection = "incoming" | "outgoing";

export interface ChatMessage {
  id: string;
  text: string;
  direction: MessageDirection;
  timestamp: number;
}