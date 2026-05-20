import type { Chat } from './types';

const chatIcon = (seed: string) => `https://api.dicebear.com/9.x/identicon/svg?seed=${seed}`;

export const chats: Chat[] = [
	{
		id: 'c-1',
		name: 'プロジェクト Aurora',
		iconUrl: chatIcon('aurora'),
		memberIds: ['u-me', 'u-1', 'u-2', 'u-3'],
		lastMessageAt: '2026-05-20T10:42:00+09:00',
		unreadCount: 3,
		isArchived: false
	},
	{
		id: 'c-2',
		name: 'デザインチーム',
		iconUrl: chatIcon('design'),
		memberIds: ['u-me', 'u-4', 'u-6', 'u-8'],
		lastMessageAt: '2026-05-20T09:15:00+09:00',
		unreadCount: 0,
		isArchived: false
	},
	{
		id: 'c-3',
		name: '社内お知らせ',
		iconUrl: chatIcon('notice'),
		memberIds: ['u-me', 'u-1', 'u-2', 'u-3', 'u-4', 'u-5', 'u-6', 'u-7', 'u-8', 'u-9'],
		lastMessageAt: '2026-05-19T18:30:00+09:00',
		unreadCount: 1,
		isArchived: false
	},
	{
		id: 'c-4',
		name: '田中 美咲',
		iconUrl: 'https://i.pravatar.cc/120?u=tanaka',
		memberIds: ['u-me', 'u-2'],
		lastMessageAt: '2026-05-19T22:10:00+09:00',
		unreadCount: 0,
		isArchived: false
	},
	{
		id: 'c-5',
		name: 'ランチ会',
		iconUrl: chatIcon('lunch'),
		memberIds: ['u-me', 'u-5', 'u-7', 'u-9'],
		lastMessageAt: '2026-05-18T12:48:00+09:00',
		unreadCount: 0,
		isArchived: false
	},
	{
		id: 'c-6',
		name: '読書クラブ',
		iconUrl: chatIcon('book'),
		memberIds: ['u-me', 'u-6', 'u-8'],
		lastMessageAt: '2026-05-15T20:00:00+09:00',
		unreadCount: 0,
		isArchived: false
	},
	{
		id: 'c-7',
		name: '旧プロジェクト Beta',
		iconUrl: chatIcon('beta'),
		memberIds: ['u-me', 'u-1', 'u-3'],
		lastMessageAt: '2026-04-30T14:20:00+09:00',
		unreadCount: 0,
		isArchived: true
	},
	{
		id: 'c-8',
		name: '退会した雑談部屋',
		iconUrl: chatIcon('zatsu'),
		memberIds: ['u-me', 'u-4', 'u-7'],
		lastMessageAt: '2026-04-10T09:00:00+09:00',
		unreadCount: 0,
		isArchived: true
	}
];
