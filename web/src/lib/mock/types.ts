export type User = {
	id: string;
	nickname: string;
	avatarUrl: string;
	birthDate: string;
	email: string;
};

export type Chat = {
	id: string;
	name: string;
	iconUrl: string;
	memberIds: string[];
	lastMessageAt: string;
	unreadCount: number;
	isArchived: boolean;
};

export type MessageType = 'text' | 'image' | 'video';

export type Message = {
	id: string;
	chatId: string;
	senderId: string;
	createdAt: string;
	type: MessageType;
	body: string;
	thumbnailUrl?: string;
};

export const CURRENT_USER_ID = 'u-me';
