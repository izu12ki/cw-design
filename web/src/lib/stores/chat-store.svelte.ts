import { chats as initialChats, messages as initialMessages, CURRENT_USER_ID } from '$lib/mock';
import type { Chat, Message } from '$lib/mock/types';

function createChatStore() {
  let chats = $state<Chat[]>(structuredClone(initialChats));
  let messages = $state<Message[]>(structuredClone(initialMessages));

  return {
    get currentUserId() {
      return CURRENT_USER_ID;
    },
    get activeChats() {
      return chats.filter((c) => !c.isArchived);
    },
    get archivedChats() {
      return chats.filter((c) => c.isArchived);
    },
    getChat(id: string): Chat | undefined {
      return chats.find((c) => c.id === id);
    },
    getMessages(chatId: string): Message[] {
      return messages
        .filter((m) => m.chatId === chatId)
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    },
    addMessage(chatId: string, body: string) {
      if (!body.trim()) return;
      const msg: Message = {
        id: `m-${Date.now()}`,
        chatId,
        senderId: CURRENT_USER_ID,
        createdAt: new Date().toISOString(),
        type: 'text',
        body: body.trim(),
      };
      messages.push(msg);
      const chat = chats.find((c) => c.id === chatId);
      if (chat) chat.lastMessageAt = msg.createdAt;
    },
    leaveChat(chatId: string) {
      const chat = chats.find((c) => c.id === chatId);
      if (chat) chat.isArchived = true;
    },
    rejoinChat(chatId: string) {
      const chat = chats.find((c) => c.id === chatId);
      if (chat) chat.isArchived = false;
    },
    markRead(chatId: string) {
      const chat = chats.find((c) => c.id === chatId);
      if (chat) chat.unreadCount = 0;
    },
  };
}

export const chatStore = createChatStore();
