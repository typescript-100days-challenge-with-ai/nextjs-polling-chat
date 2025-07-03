export interface Message {
  id: number;
  user: string;
  message: string;
  timestamp: number;
}

// In-memory store for chat messages
const messages: Message[] = [];
let nextId = 1;

export const getMessages = (): Message[] => {
  return messages;
};

export const addMessage = (user: string, message: string): Message => {
  const newMessage: Message = {
    id: nextId++,
    user,
    message,
    timestamp: Date.now(),
  };
  messages.push(newMessage);
  return newMessage;
};
