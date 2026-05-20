import type { User } from './types';
import { CURRENT_USER_ID } from './types';

const avatar = (seed: string) => `https://i.pravatar.cc/120?u=${seed}`;

export const users: User[] = [
	{
		id: CURRENT_USER_ID,
		nickname: '自分',
		avatarUrl: avatar('me'),
		birthDate: '1995-04-12',
		email: 'me@example.com'
	},
	{
		id: 'u-1',
		nickname: '佐藤 翔太',
		avatarUrl: avatar('sato'),
		birthDate: '1990-01-15',
		email: 'sato@example.com'
	},
	{
		id: 'u-2',
		nickname: '田中 美咲',
		avatarUrl: avatar('tanaka'),
		birthDate: '1992-07-23',
		email: 'tanaka@example.com'
	},
	{
		id: 'u-3',
		nickname: '鈴木 健',
		avatarUrl: avatar('suzuki'),
		birthDate: '1988-11-30',
		email: 'suzuki@example.com'
	},
	{
		id: 'u-4',
		nickname: '高橋 ゆかり',
		avatarUrl: avatar('takahashi'),
		birthDate: '1994-03-08',
		email: 'takahashi@example.com'
	},
	{
		id: 'u-5',
		nickname: '伊藤 大輔',
		avatarUrl: avatar('ito'),
		birthDate: '1989-09-19',
		email: 'ito@example.com'
	},
	{
		id: 'u-6',
		nickname: '山本 さくら',
		avatarUrl: avatar('yamamoto'),
		birthDate: '1996-05-02',
		email: 'yamamoto@example.com'
	},
	{
		id: 'u-7',
		nickname: '中村 龍',
		avatarUrl: avatar('nakamura'),
		birthDate: '1991-12-17',
		email: 'nakamura@example.com'
	},
	{
		id: 'u-8',
		nickname: '小林 杏',
		avatarUrl: avatar('kobayashi'),
		birthDate: '1993-08-25',
		email: 'kobayashi@example.com'
	},
	{
		id: 'u-9',
		nickname: '加藤 翼',
		avatarUrl: avatar('kato'),
		birthDate: '1987-02-14',
		email: 'kato@example.com'
	}
];

export const usersById = Object.fromEntries(users.map((u) => [u.id, u]));
