# Chat App 3 Designs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Chatwork ライクなチャットアプリ UI を 3 つのデザイン案 (Classic Chatwork / Modern Workspace / Friendly Minimal) でモック実装し、`/` ランディングから比較できる SvelteKit アプリを作る。

**Architecture:** モックデータ + Svelte 5 `$state` ストアを 3 デザイン共通で利用。各デザインは `routes/design-{a|b|c}/+layout.svelte` で独自シェルと CSS 変数を適用し、shadcn-svelte (vega) を共通 primitive として使う。

**Tech Stack:** SvelteKit 2, Svelte 5, TypeScript, Tailwind CSS v4, shadcn-svelte (vega style)

**Verification approach:** UI モックのため厳格な TDD ではなく、各タスクで `npm run dev` + `npm run check` で型/視覚検証を実施。

**Spec reference:** `docs/superpowers/specs/2026-05-20-chat-app-3-designs-design.md`

---

## Phase 1: Foundation

### Task 1: Mock Data Types and Data

**Files:**

- Create: `src/lib/mock/types.ts`
- Create: `src/lib/mock/users.ts`
- Create: `src/lib/mock/chats.ts`
- Create: `src/lib/mock/messages.ts`
- Create: `src/lib/mock/index.ts`

- [ ] **Step 1: Create `src/lib/mock/types.ts`**

```ts
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
```

- [ ] **Step 2: Create `src/lib/mock/users.ts`**

```ts
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
```

- [ ] **Step 3: Create `src/lib/mock/chats.ts`**

```ts
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
```

- [ ] **Step 4: Create `src/lib/mock/messages.ts`**

```ts
import type { Message } from './types';

const img = (seed: number) => `https://picsum.photos/seed/${seed}/600/400`;
const VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const VIDEO_THUMB = 'https://picsum.photos/seed/video/600/400';

const make = (
	chatId: string,
	senderId: string,
	body: string,
	offsetMinutes: number,
	type: 'text' | 'image' | 'video' = 'text',
	thumbnailUrl?: string
): Message => ({
	id: `${chatId}-${senderId}-${offsetMinutes}`,
	chatId,
	senderId,
	createdAt: new Date(
		Date.parse('2026-05-20T10:00:00+09:00') - offsetMinutes * 60_000
	).toISOString(),
	type,
	body,
	thumbnailUrl
});

export const messages: Message[] = [
	// c-1: プロジェクト Aurora (active)
	make('c-1', 'u-1', 'おはようございます。今日のリリース、最終確認お願いします。', 240),
	make('c-1', 'u-2', '了解です。手元のチェックリスト上げます。', 235),
	make('c-1', 'u-2', img(11), 230, 'image'),
	make('c-1', 'u-me', '確認しました。問題なさそうです。', 225),
	make('c-1', 'u-3', 'デモ動画も置いておきます。', 60, 'text'),
	make('c-1', 'u-3', VIDEO, 58, 'video', VIDEO_THUMB),
	make('c-1', 'u-1', 'ありがとうございます！\n夕方にリリース回します。', 30),
	make('c-1', 'u-me', 'よろしくお願いします。', 10),

	// c-2: デザインチーム
	make('c-2', 'u-4', '新しいトンマナ案、共有します。', 180),
	make('c-2', 'u-4', img(21), 178, 'image'),
	make('c-2', 'u-6', 'いい感じですね。色味もう少し落ち着いてもいいかも。', 175),
	make('c-2', 'u-8', '私も同意です。', 170),
	make('c-2', 'u-me', '了解です。木曜までに差し戻します。', 165),

	// c-3: 社内お知らせ
	make('c-3', 'u-1', '【全社】来週の総会、会場が変更になりました。', 360),
	make('c-3', 'u-2', '了解しました。', 355),
	make('c-3', 'u-5', '新しい会場の地図をお願いします。', 350),
	make('c-3', 'u-1', img(31), 345, 'image'),

	// c-4: 田中 美咲 (DM)
	make('c-4', 'u-2', 'お疲れさまです、ちょっと相談したいことが。', 200),
	make('c-4', 'u-me', 'もちろん。何かありました？', 198),
	make('c-4', 'u-2', '実は来週の発表資料で…', 196),
	make('c-4', 'u-2', img(41), 194, 'image'),
	make('c-4', 'u-me', '画面共有しながら話しましょう。', 190),

	// c-5: ランチ会
	make('c-5', 'u-5', '今日のランチどこにします？', 500),
	make('c-5', 'u-7', '駅前のラーメンどうですか', 498),
	make('c-5', 'u-9', '賛成', 496),
	make('c-5', 'u-me', 'いいですね、12:00に集合で', 494),

	// c-6: 読書クラブ
	make('c-6', 'u-6', '今月の課題本、決めました', 1200),
	make('c-6', 'u-8', '楽しみです', 1195),
	make('c-6', 'u-6', img(61), 1190, 'image'),

	// c-7: 旧プロジェクト Beta (archived)
	make('c-7', 'u-1', 'プロジェクト終了お疲れさまでした', 30000),
	make('c-7', 'u-me', 'ありがとうございました', 29998),

	// c-8: 退会した雑談部屋 (archived)
	make('c-8', 'u-4', 'お元気でしたか？', 50000),
	make('c-8', 'u-me', 'ぼちぼちです', 49998)
];
```

- [ ] **Step 5: Create `src/lib/mock/index.ts`**

```ts
export * from './types';
export { users, usersById } from './users';
export { chats } from './chats';
export { messages } from './messages';
```

- [ ] **Step 6: Verify types**

Run: `npm run check`
Expected: PASS (no type errors)

- [ ] **Step 7: Commit**

```bash
git add src/lib/mock/
git commit -m "feat(mock): モックデータ層 (users/chats/messages) の追加"
```

---

### Task 2: Chat Store (Svelte 5 $state)

**Files:**

- Create: `src/lib/stores/chat-store.svelte.ts`

- [ ] **Step 1: Create `src/lib/stores/chat-store.svelte.ts`**

```ts
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
				body: body.trim()
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
		}
	};
}

export const chatStore = createChatStore();
```

- [ ] **Step 2: Verify types**

Run: `npm run check`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/lib/stores/
git commit -m "feat(store): Svelte 5 $state ベースのチャットストアを追加"
```

---

### Task 3: Install shadcn-svelte Components

**Files:**

- Add: `src/lib/components/ui/` (auto-generated by shadcn-svelte CLI)

- [ ] **Step 1: Install all needed components in one command**

```bash
pnpm dlx shadcn-svelte@latest add button input textarea label avatar card dialog drawer separator scroll-area dropdown-menu switch tabs badge sheet alert alert-dialog
```

Expected: 17 components added under `src/lib/components/ui/`.

- [ ] **Step 2: Verify each component directory exists**

Run: `ls src/lib/components/ui/`
Expected: directories for button, input, textarea, label, avatar, card, dialog, drawer, separator, scroll-area, dropdown-menu, switch, tabs, badge, sheet, alert, alert-dialog.

- [ ] **Step 3: Verify build**

Run: `npm run check`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/lib/components/ui/ components.json
git commit -m "chore(ui): shadcn-svelte コンポーネントを導入"
```

---

### Task 4: Shared Utilities (Push Notification + Time Format)

**Files:**

- Create: `src/lib/shared/notify.ts`
- Create: `src/lib/shared/format.ts`

- [ ] **Step 1: Create `src/lib/shared/notify.ts`**

```ts
export type NotifyPermission = 'default' | 'granted' | 'denied' | 'unsupported';

export function currentPermission(): NotifyPermission {
	if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
	return Notification.permission as NotifyPermission;
}

export async function requestNotificationPermission(): Promise<NotifyPermission> {
	if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
	const result = await Notification.requestPermission();
	return result as NotifyPermission;
}

export function sendTestNotification(title = '新しいメッセージ', body = 'テスト通知です') {
	if (currentPermission() !== 'granted') return false;
	new Notification(title, { body });
	return true;
}
```

- [ ] **Step 2: Create `src/lib/shared/format.ts`**

```ts
export function formatTime(iso: string): string {
	const d = new Date(iso);
	return d.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
}

export function formatDateLabel(iso: string): string {
	const d = new Date(iso);
	const today = new Date();
	if (d.toDateString() === today.toDateString()) return '今日';
	const yesterday = new Date();
	yesterday.setDate(today.getDate() - 1);
	if (d.toDateString() === yesterday.toDateString()) return '昨日';
	return d.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' });
}

export function formatChatListTime(iso: string): string {
	const d = new Date(iso);
	const today = new Date();
	if (d.toDateString() === today.toDateString()) return formatTime(iso);
	return d.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' });
}
```

- [ ] **Step 3: Verify types**

Run: `npm run check`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/lib/shared/
git commit -m "feat(shared): プッシュ通知ヘルパーと日時フォーマッタを追加"
```

---

### Task 5: Landing Page

**Files:**

- Modify: `src/routes/+page.svelte`

- [ ] **Step 1: Replace `src/routes/+page.svelte`**

```svelte
<script lang="ts">
	const designs = [
		{
			id: 'a',
			name: 'Classic Chatwork',
			description: '情報密度重視。3ペイン構成でビジネス向けにフィット。',
			accent: '#1B4F8B',
			preview: 'border-l-4 border-[#1B4F8B] bg-white'
		},
		{
			id: 'b',
			name: 'Modern Workspace',
			description: 'モダンで広めの余白。ダークサイドバー + 2ペイン。',
			accent: '#7C3AED',
			preview: 'bg-gradient-to-br from-[#1A1A2E] to-[#2D2D44] text-white'
		},
		{
			id: 'c',
			name: 'Friendly Minimal',
			description: '柔らかい配色と丸み。タブレット優先のシンプル構成。',
			accent: '#FF8A65',
			preview: 'bg-[#FFF8F3] border border-[#FF8A65]/30'
		}
	];
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-neutral-50 p-8">
	<header class="mb-12 text-center">
		<h1 class="mb-3 text-4xl font-bold text-neutral-900">Chat App デザイン比較</h1>
		<p class="text-neutral-600">3つのデザイン案からお選びください</p>
	</header>

	<div class="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
		{#each designs as d (d.id)}
			<a
				href={`/design-${d.id}/login`}
				class="block overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg"
			>
				<div class={`h-40 ${d.preview} flex items-center justify-center`}>
					<span class="text-2xl font-bold" style={`color: ${d.accent}`}
						>Design {d.id.toUpperCase()}</span
					>
				</div>
				<div class="p-6">
					<h2 class="mb-2 text-xl font-semibold">{d.name}</h2>
					<p class="text-sm text-neutral-600">{d.description}</p>
				</div>
			</a>
		{/each}
	</div>
</div>
```

- [ ] **Step 2: Run dev server and verify**

Run: `npm run dev` (then open http://localhost:5173)
Expected: 3 design cards visible, hover effect works, click navigates to `/design-{x}/login` (404 expected at this point).

- [ ] **Step 3: Commit**

```bash
git add src/routes/+page.svelte
git commit -m "feat(landing): 3デザインを選択するランディングページ"
```

---

## Phase 2: Design A — Classic Chatwork

### Task 6: Design A Layout Shell + CSS Variables

**Files:**

- Create: `src/routes/design-a/+layout.svelte`
- Create: `src/routes/design-a/+layout.ts`

- [ ] **Step 1: Create `src/routes/design-a/+layout.ts`**

```ts
export const prerender = false;
```

- [ ] **Step 2: Create `src/routes/design-a/+layout.svelte`**

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import { MessageSquare, Archive, Settings, LogIn } from '@lucide/svelte';

	let { children } = $props();

	const isAuth = $derived(
		page.url.pathname.includes('/login') || page.url.pathname.includes('/signup')
	);

	const nav = [
		{ href: '/design-a/chats', icon: MessageSquare, label: 'チャット' },
		{ href: '/design-a/archive', icon: Archive, label: '退会済み' },
		{ href: '/design-a/settings/account', icon: Settings, label: '設定' }
	];
</script>

<div class="design-a flex min-h-screen" data-design="a">
	{#if !isAuth}
		<aside class="flex w-16 flex-col items-center gap-2 bg-[#1B4F8B] py-4 text-white">
			<div class="mb-4 flex h-10 w-10 items-center justify-center rounded bg-white/15 font-bold">
				CW
			</div>
			{#each nav as n (n.href)}
				<a
					href={n.href}
					class="flex h-12 w-12 flex-col items-center justify-center rounded text-[10px] hover:bg-white/15 {page.url.pathname.startsWith(
						n.href
					)
						? 'bg-white/20'
						: ''}"
					aria-label={n.label}
				>
					<n.icon class="h-5 w-5" />
					<span class="mt-0.5">{n.label}</span>
				</a>
			{/each}
			<div class="flex-1"></div>
			<a
				href="/"
				class="flex h-12 w-12 items-center justify-center rounded hover:bg-white/15"
				aria-label="戻る"
			>
				<LogIn class="h-5 w-5 rotate-180" />
			</a>
		</aside>
	{/if}
	<main class="min-w-0 flex-1 bg-neutral-50">
		{@render children()}
	</main>
</div>

<style>
	.design-a {
		--accent: #1b4f8b;
		--accent-hover: #163d6d;
		--radius: 4px;
		font-size: 14px;
	}
</style>
```

- [ ] **Step 3: Verify**

Run: `npm run dev` and open http://localhost:5173/design-a/login
Expected: 404 (route does not exist yet) but no build errors.

- [ ] **Step 4: Commit**

```bash
git add src/routes/design-a/
git commit -m "feat(design-a): レイアウトシェルとCSS変数を追加"
```

---

### Task 7: Design A Auth Pages (Login + Signup)

**Files:**

- Create: `src/routes/design-a/login/+page.svelte`
- Create: `src/routes/design-a/signup/+page.svelte`

- [ ] **Step 1: Create `src/routes/design-a/login/+page.svelte`**

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let email = $state('');
	let password = $state('');

	function handleSubmit(e: Event) {
		e.preventDefault();
		alert('ログインしました（モック）');
		goto('/design-a/chats');
	}
</script>

<div class="flex min-h-screen items-center justify-center p-8">
	<form
		onsubmit={handleSubmit}
		class="w-full max-w-sm rounded-sm border border-neutral-200 bg-white p-8 shadow-sm"
	>
		<h1 class="mb-1 text-xl font-bold text-[#1B4F8B]">ログイン</h1>
		<p class="mb-6 text-sm text-neutral-500">アカウント情報を入力してください</p>
		<div class="space-y-4">
			<div class="space-y-1.5">
				<Label for="email">メールアドレス</Label>
				<Input id="email" type="email" bind:value={email} required />
			</div>
			<div class="space-y-1.5">
				<Label for="password">パスワード</Label>
				<Input id="password" type="password" bind:value={password} required />
			</div>
		</div>
		<Button type="submit" class="mt-6 w-full bg-[#1B4F8B] hover:bg-[#163D6D]">ログイン</Button>
		<p class="mt-4 text-center text-sm text-neutral-600">
			アカウントをお持ちでない方は
			<a href="/design-a/signup" class="text-[#1B4F8B] underline">新規登録</a>
		</p>
	</form>
</div>
```

- [ ] **Step 2: Create `src/routes/design-a/signup/+page.svelte`**

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let nickname = $state('');
	let birthDate = $state('');
	let email = $state('');
	let password = $state('');

	function handleSubmit(e: Event) {
		e.preventDefault();
		alert('登録しました（モック）');
		goto('/design-a/chats');
	}
</script>

<div class="flex min-h-screen items-center justify-center p-8">
	<form
		onsubmit={handleSubmit}
		class="w-full max-w-sm rounded-sm border border-neutral-200 bg-white p-8 shadow-sm"
	>
		<h1 class="mb-1 text-xl font-bold text-[#1B4F8B]">新規会員登録</h1>
		<p class="mb-6 text-sm text-neutral-500">アカウントを作成します</p>
		<div class="space-y-4">
			<div class="space-y-1.5">
				<Label for="nickname">ニックネーム</Label>
				<Input id="nickname" bind:value={nickname} required />
			</div>
			<div class="space-y-1.5">
				<Label for="birthDate">生年月日</Label>
				<Input id="birthDate" type="date" bind:value={birthDate} required />
			</div>
			<div class="space-y-1.5">
				<Label for="email">メールアドレス</Label>
				<Input id="email" type="email" bind:value={email} required />
			</div>
			<div class="space-y-1.5">
				<Label for="password">パスワード</Label>
				<Input id="password" type="password" bind:value={password} required />
			</div>
		</div>
		<Button type="submit" class="mt-6 w-full bg-[#1B4F8B] hover:bg-[#163D6D]">登録する</Button>
		<p class="mt-4 text-center text-sm text-neutral-600">
			既にアカウントをお持ちの方は
			<a href="/design-a/login" class="text-[#1B4F8B] underline">ログイン</a>
		</p>
	</form>
</div>
```

- [ ] **Step 3: Verify**

Open `/design-a/login` and `/design-a/signup`. Confirm form renders, submit shows alert and navigates.

- [ ] **Step 4: Commit**

```bash
git add src/routes/design-a/login/ src/routes/design-a/signup/
git commit -m "feat(design-a): ログイン・新規登録ページ"
```

---

### Task 8: Design A Chat List

**Files:**

- Create: `src/routes/design-a/chats/+page.svelte`
- Create: `src/routes/design-a/chats/+layout.svelte`

- [ ] **Step 1: Create `src/routes/design-a/chats/+layout.svelte` (3-pane shell)**

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import { chatStore } from '$lib/stores/chat-store.svelte';
	import { formatChatListTime } from '$lib/shared/format';

	let { children } = $props();

	const activeChats = $derived(chatStore.activeChats);
	const activeId = $derived(page.params.id);
</script>

<div class="flex h-screen">
	<aside class="flex w-[280px] flex-col border-r border-neutral-200 bg-white">
		<header class="border-b border-neutral-200 p-4">
			<h1 class="font-bold text-[#1B4F8B]">チャット</h1>
		</header>
		<ul class="flex-1 overflow-y-auto">
			{#each activeChats as c (c.id)}
				<li>
					<a
						href={`/design-a/chats/${c.id}`}
						class="flex gap-3 border-b border-neutral-100 p-3 hover:bg-neutral-50 {activeId === c.id
							? 'bg-[#E8F0FA]'
							: ''}"
					>
						<img src={c.iconUrl} alt="" class="h-10 w-10 rounded-sm" />
						<div class="min-w-0 flex-1">
							<div class="flex items-baseline justify-between">
								<span class="truncate text-sm font-medium">{c.name}</span>
								<span class="ml-2 shrink-0 text-xs text-neutral-500"
									>{formatChatListTime(c.lastMessageAt)}</span
								>
							</div>
							<div class="mt-0.5 flex items-center gap-2">
								<span class="truncate text-xs text-neutral-500"
									>メンバー {c.memberIds.length}名</span
								>
								{#if c.unreadCount > 0}
									<span
										class="ml-auto rounded-full bg-[#1B4F8B] px-1.5 py-0.5 text-[10px] text-white"
										>{c.unreadCount}</span
									>
								{/if}
							</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</aside>
	<section class="min-w-0 flex-1">
		{@render children()}
	</section>
</div>
```

- [ ] **Step 2: Create `src/routes/design-a/chats/+page.svelte` (empty state)**

```svelte
<div class="flex h-full items-center justify-center text-neutral-400">
	<p>チャットを選択してください</p>
</div>
```

- [ ] **Step 3: Verify**

Open `/design-a/chats` after logging in. Confirm 6 active chats listed (2 archived hidden), unread badges visible, list scrolls.

- [ ] **Step 4: Commit**

```bash
git add src/routes/design-a/chats/
git commit -m "feat(design-a): チャット一覧（3ペイン構成）"
```

---

### Task 9: Design A Chat Detail (with Messages)

**Files:**

- Create: `src/routes/design-a/chats/[id]/+page.svelte`
- Create: `src/lib/shared/MediaViewer.svelte`

- [ ] **Step 1: Create `src/lib/shared/MediaViewer.svelte`**

```svelte
<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';

	let { open = $bindable(false), src = '' }: { open?: boolean; src?: string } = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-w-4xl border-0 bg-transparent p-0 shadow-none">
		<img {src} alt="" class="h-auto w-full rounded" />
	</Dialog.Content>
</Dialog.Root>
```

- [ ] **Step 2: Create `src/routes/design-a/chats/[id]/+page.svelte`**

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import { chatStore } from '$lib/stores/chat-store.svelte';
	import { usersById } from '$lib/mock';
	import { formatTime } from '$lib/shared/format';
	import { Button } from '$lib/components/ui/button';
	import MediaViewer from '$lib/shared/MediaViewer.svelte';
	import { Settings } from '@lucide/svelte';

	const chatId = $derived(page.params.id);
	const chat = $derived(chatStore.getChat(chatId));
	const messages = $derived(chat ? chatStore.getMessages(chatId) : []);

	let input = $state('');
	let viewerOpen = $state(false);
	let viewerSrc = $state('');

	function openImage(src: string) {
		viewerSrc = src;
		viewerOpen = true;
	}

	function send() {
		if (!input.trim()) return;
		chatStore.addMessage(chatId, input);
		input = '';
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) send();
	}
</script>

{#if !chat}
	<div class="flex h-full items-center justify-center text-neutral-400">
		チャットが見つかりません
	</div>
{:else}
	<div class="flex h-screen flex-col">
		<header class="flex items-center justify-between border-b border-neutral-200 bg-white p-3">
			<div class="flex items-center gap-3">
				<img src={chat.iconUrl} alt="" class="h-9 w-9 rounded-sm" />
				<div>
					<h2 class="text-sm font-bold text-[#1B4F8B]">{chat.name}</h2>
					<p class="text-xs text-neutral-500">メンバー {chat.memberIds.length}名</p>
				</div>
			</div>
			<a
				href={`/design-a/chats/${chatId}/settings`}
				class="rounded p-2 hover:bg-neutral-100"
				aria-label="設定"
			>
				<Settings class="h-4 w-4 text-neutral-600" />
			</a>
		</header>

		<ul class="flex-1 space-y-3 overflow-y-auto bg-neutral-50 p-4">
			{#each messages as m (m.id)}
				{@const user = usersById[m.senderId]}
				<li class="flex gap-3">
					<img src={user.avatarUrl} alt="" class="h-8 w-8 shrink-0 rounded-sm" />
					<div class="min-w-0 flex-1">
						<div class="flex items-baseline gap-2">
							<span class="text-sm font-medium">{user.nickname}</span>
							<span class="text-xs text-neutral-500">{formatTime(m.createdAt)}</span>
						</div>
						<div class="mt-1">
							{#if m.type === 'text'}
								<p class="text-sm whitespace-pre-wrap">{m.body}</p>
							{:else if m.type === 'image'}
								<button
									type="button"
									onclick={() => openImage(m.body)}
									class="block max-w-sm overflow-hidden rounded"
								>
									<img src={m.body} alt="" class="h-auto w-full" />
								</button>
							{:else if m.type === 'video'}
								<video controls poster={m.thumbnailUrl} class="max-w-sm rounded">
									<source src={m.body} type="video/mp4" />
								</video>
							{/if}
						</div>
					</div>
				</li>
			{/each}
		</ul>

		<footer class="border-t border-neutral-200 bg-white p-3">
			<div class="flex gap-2">
				<textarea
					bind:value={input}
					onkeydown={handleKey}
					rows="2"
					placeholder="メッセージを入力 (Ctrl+Enter で送信)"
					class="flex-1 resize-none rounded-sm border border-neutral-300 p-2 text-sm focus:border-[#1B4F8B] focus:outline-none"
				></textarea>
				<Button onclick={send} class="self-end bg-[#1B4F8B] hover:bg-[#163D6D]">送信</Button>
			</div>
		</footer>
	</div>

	<MediaViewer bind:open={viewerOpen} src={viewerSrc} />
{/if}
```

- [ ] **Step 3: Verify**

Open `/design-a/chats/c-1`. Confirm:

- Messages render with text/image/video
- Clicking image opens modal viewer
- Video plays inline
- Ctrl+Enter (Mac: Cmd+Enter) sends; new message appears
- Settings icon visible

- [ ] **Step 4: Commit**

```bash
git add src/routes/design-a/chats/\[id\]/ src/lib/shared/MediaViewer.svelte
git commit -m "feat(design-a): チャット画面（テキスト/画像/動画表示）"
```

---

### Task 10: Design A Chat Settings + Archive

**Files:**

- Create: `src/routes/design-a/chats/[id]/settings/+page.svelte`
- Create: `src/routes/design-a/archive/+page.svelte`

- [ ] **Step 1: Create `src/routes/design-a/chats/[id]/settings/+page.svelte`**

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { chatStore } from '$lib/stores/chat-store.svelte';
	import { usersById } from '$lib/mock';
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { ChevronLeft } from '@lucide/svelte';

	const chatId = $derived(page.params.id);
	const chat = $derived(chatStore.getChat(chatId));
	let confirmOpen = $state(false);

	function leave() {
		chatStore.leaveChat(chatId);
		confirmOpen = false;
		goto('/design-a/chats');
	}
</script>

{#if !chat}
	<div class="p-8">チャットが見つかりません</div>
{:else}
	<div class="mx-auto max-w-2xl p-6">
		<a
			href={`/design-a/chats/${chatId}`}
			class="mb-4 inline-flex items-center text-sm text-[#1B4F8B]"
		>
			<ChevronLeft class="h-4 w-4" /> チャットに戻る
		</a>
		<div class="rounded-sm border border-neutral-200 bg-white p-6">
			<div class="flex items-center gap-4 border-b border-neutral-100 pb-4">
				<img src={chat.iconUrl} alt="" class="h-14 w-14 rounded-sm" />
				<div>
					<h1 class="text-lg font-bold text-[#1B4F8B]">{chat.name}</h1>
					<p class="text-sm text-neutral-500">メンバー {chat.memberIds.length}名</p>
				</div>
			</div>

			<section class="border-b border-neutral-100 py-4">
				<h2 class="mb-3 text-sm font-bold">メンバー</h2>
				<ul class="space-y-2">
					{#each chat.memberIds as id (id)}
						{@const u = usersById[id]}
						<li class="flex items-center gap-3 text-sm">
							<img src={u.avatarUrl} alt="" class="h-7 w-7 rounded-sm" />
							<span>{u.nickname}</span>
						</li>
					{/each}
				</ul>
			</section>

			<section class="pt-4">
				<h2 class="mb-2 text-sm font-bold text-red-600">危険な操作</h2>
				<Button variant="destructive" onclick={() => (confirmOpen = true)}
					>このチャットから退会する</Button
				>
			</section>
		</div>
	</div>

	<AlertDialog.Root bind:open={confirmOpen}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>チャットから退会しますか？</AlertDialog.Title>
				<AlertDialog.Description>
					退会したチャットは「退会済み」一覧から再入会できます。
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>キャンセル</AlertDialog.Cancel>
				<AlertDialog.Action onclick={leave}>退会する</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}
```

- [ ] **Step 2: Create `src/routes/design-a/archive/+page.svelte`**

```svelte
<script lang="ts">
	import { chatStore } from '$lib/stores/chat-store.svelte';
	import { Button } from '$lib/components/ui/button';

	const archived = $derived(chatStore.archivedChats);
</script>

<div class="mx-auto max-w-3xl p-6">
	<h1 class="mb-4 text-xl font-bold text-[#1B4F8B]">退会したチャット</h1>
	{#if archived.length === 0}
		<p class="text-sm text-neutral-500">退会したチャットはありません。</p>
	{:else}
		<ul class="space-y-2">
			{#each archived as c (c.id)}
				<li class="flex items-center gap-4 rounded-sm border border-neutral-200 bg-white p-4">
					<img src={c.iconUrl} alt="" class="h-12 w-12 rounded-sm" />
					<div class="flex-1">
						<h2 class="font-medium">{c.name}</h2>
						<p class="text-xs text-neutral-500">メンバー {c.memberIds.length}名</p>
					</div>
					<Button class="bg-[#1B4F8B] hover:bg-[#163D6D]" onclick={() => chatStore.rejoinChat(c.id)}
						>再入会</Button
					>
				</li>
			{/each}
		</ul>
	{/if}
</div>
```

- [ ] **Step 3: Verify**

- Navigate to `/design-a/chats/c-1/settings` → click 退会する → confirm → returns to chat list, c-1 disappears from active list
- Navigate to `/design-a/archive` → see c-1 (just left) + c-7, c-8
- Click 再入会 on one → chat moves back to active list

- [ ] **Step 4: Commit**

```bash
git add src/routes/design-a/chats/\[id\]/settings/ src/routes/design-a/archive/
git commit -m "feat(design-a): チャット設定（退会）と退会済みチャット一覧"
```

---

### Task 11: Design A Settings Pages

**Files:**

- Create: `src/routes/design-a/settings/+layout.svelte`
- Create: `src/routes/design-a/settings/account/+page.svelte`
- Create: `src/routes/design-a/settings/contact/+page.svelte`
- Create: `src/routes/design-a/settings/terms/+page.svelte`
- Create: `src/routes/design-a/settings/faq/+page.svelte`
- Create: `src/routes/design-a/settings/privacy/+page.svelte`
- Create: `src/routes/design-a/settings/delete/+page.svelte`

- [ ] **Step 1: Create `src/routes/design-a/settings/+layout.svelte`**

```svelte
<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();

	const items = [
		{ href: '/design-a/settings/account', label: 'アカウント' },
		{ href: '/design-a/settings/contact', label: 'お問い合わせ' },
		{ href: '/design-a/settings/terms', label: '利用規約' },
		{ href: '/design-a/settings/faq', label: 'よくあるご質問' },
		{ href: '/design-a/settings/privacy', label: 'プライバシーポリシー' },
		{ href: '/design-a/settings/delete', label: 'アプリから退会' }
	];
</script>

<div class="flex h-screen">
	<aside class="w-[240px] border-r border-neutral-200 bg-white">
		<header class="border-b border-neutral-200 p-4 font-bold text-[#1B4F8B]">設定</header>
		<ul>
			{#each items as it (it.href)}
				<li>
					<a
						href={it.href}
						class="block border-b border-neutral-100 px-4 py-3 text-sm hover:bg-neutral-50 {page.url
							.pathname === it.href
							? 'bg-[#E8F0FA] font-medium text-[#1B4F8B]'
							: ''}"
					>
						{it.label}
					</a>
				</li>
			{/each}
		</ul>
	</aside>
	<section class="flex-1 overflow-y-auto p-6">
		{@render children()}
	</section>
</div>
```

- [ ] **Step 2: Create `src/routes/design-a/settings/account/+page.svelte`**

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import { usersById, CURRENT_USER_ID } from '$lib/mock';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import {
		currentPermission,
		requestNotificationPermission,
		sendTestNotification,
		type NotifyPermission
	} from '$lib/shared/notify';
	import { onMount } from 'svelte';

	const me = usersById[CURRENT_USER_ID];
	let nickname = $state(me.nickname);
	let birthDate = $state(me.birthDate);
	let email = $state(me.email);
	let password = $state('');
	let permission = $state<NotifyPermission>('default');

	onMount(() => {
		permission = currentPermission();
	});

	async function toggleNotify() {
		if (permission === 'granted') {
			alert('ブラウザの設定から通知を無効にしてください');
			return;
		}
		permission = await requestNotificationPermission();
	}

	function save(e: Event) {
		e.preventDefault();
		alert('保存しました（モック）');
	}

	function logout() {
		if (confirm('ログアウトしますか？')) goto('/design-a/login');
	}
</script>

<div class="max-w-xl">
	<h1 class="mb-4 text-xl font-bold text-[#1B4F8B]">アカウント設定</h1>
	<form onsubmit={save} class="space-y-4 rounded-sm border border-neutral-200 bg-white p-6">
		<div class="space-y-1.5">
			<Label for="nickname">ニックネーム</Label>
			<Input id="nickname" bind:value={nickname} />
		</div>
		<div class="space-y-1.5">
			<Label for="birthDate">生年月日</Label>
			<Input id="birthDate" type="date" bind:value={birthDate} />
		</div>
		<div class="space-y-1.5">
			<Label for="email">メールアドレス</Label>
			<Input id="email" type="email" bind:value={email} />
		</div>
		<div class="space-y-1.5">
			<Label for="password">新しいパスワード</Label>
			<Input
				id="password"
				type="password"
				bind:value={password}
				placeholder="変更しない場合は空欄"
			/>
		</div>
		<Button type="submit" class="bg-[#1B4F8B] hover:bg-[#163D6D]">保存</Button>
	</form>

	<div class="mt-6 rounded-sm border border-neutral-200 bg-white p-6">
		<h2 class="mb-3 text-sm font-bold">プッシュ通知</h2>
		<div class="mb-3 flex items-center justify-between">
			<span class="text-sm">通知を有効にする</span>
			<Switch
				checked={permission === 'granted'}
				onCheckedChange={toggleNotify}
				disabled={permission === 'unsupported'}
			/>
		</div>
		<p class="mb-3 text-xs text-neutral-500">状態: {permission}</p>
		<Button
			variant="outline"
			onclick={() => sendTestNotification()}
			disabled={permission !== 'granted'}>テスト通知を送る</Button
		>
	</div>

	<div class="mt-6 rounded-sm border border-neutral-200 bg-white p-6">
		<Button variant="outline" onclick={logout}>ログアウト</Button>
	</div>
</div>
```

- [ ] **Step 3: Create `src/routes/design-a/settings/contact/+page.svelte`**

```svelte
<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let subject = $state('');
	let body = $state('');

	function submit(e: Event) {
		e.preventDefault();
		alert('送信しました（モック）');
		subject = '';
		body = '';
	}
</script>

<div class="max-w-xl">
	<h1 class="mb-4 text-xl font-bold text-[#1B4F8B]">お問い合わせ</h1>
	<form onsubmit={submit} class="space-y-4 rounded-sm border border-neutral-200 bg-white p-6">
		<div class="space-y-1.5">
			<Label for="subject">件名</Label>
			<Input id="subject" bind:value={subject} required />
		</div>
		<div class="space-y-1.5">
			<Label for="body">お問い合わせ内容</Label>
			<textarea
				id="body"
				bind:value={body}
				required
				rows="8"
				class="w-full rounded-sm border border-neutral-300 p-2 text-sm focus:border-[#1B4F8B] focus:outline-none"
			></textarea>
		</div>
		<Button type="submit" class="bg-[#1B4F8B] hover:bg-[#163D6D]">送信</Button>
	</form>
</div>
```

- [ ] **Step 4: Create `src/routes/design-a/settings/terms/+page.svelte`**

```svelte
<div class="max-w-2xl">
	<h1 class="mb-4 text-xl font-bold text-[#1B4F8B]">利用規約</h1>
	<article
		class="space-y-4 rounded-sm border border-neutral-200 bg-white p-6 text-sm leading-relaxed"
	>
		<h2 class="font-bold">第1条（適用）</h2>
		<p>
			本規約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。
		</p>
		<h2 class="font-bold">第2条（利用登録）</h2>
		<p>
			登録希望者が当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。
		</p>
		<h2 class="font-bold">第3条（禁止事項）</h2>
		<p>
			ユーザーは、本サービスの利用にあたり、法令または公序良俗に違反する行為、犯罪行為に関連する行為、当社のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為等を行ってはなりません。
		</p>
		<h2 class="font-bold">第4条（本サービスの提供の停止等）</h2>
		<p>
			当社は、本サービスのいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断できるものとします。
		</p>
	</article>
</div>
```

- [ ] **Step 5: Create `src/routes/design-a/settings/faq/+page.svelte`**

```svelte
<div class="max-w-2xl">
	<h1 class="mb-4 text-xl font-bold text-[#1B4F8B]">よくあるご質問</h1>
	<div class="space-y-3">
		{#each [{ q: 'チャットから退会するには？', a: 'チャット画面右上の設定アイコンから「このチャットから退会する」を選択してください。' }, { q: '退会したチャットに戻りたい', a: '左ナビの「退会済み」から該当チャットを選び、「再入会」を押してください。' }, { q: '通知が届きません', a: 'アカウント設定の通知を有効にし、ブラウザの権限を確認してください。' }, { q: 'アプリから退会したい', a: '設定 → 「アプリから退会」から手続きできます。' }] as item, i (i)}
			<details class="rounded-sm border border-neutral-200 bg-white p-4">
				<summary class="cursor-pointer font-medium">{item.q}</summary>
				<p class="mt-2 text-sm text-neutral-700">{item.a}</p>
			</details>
		{/each}
	</div>
</div>
```

- [ ] **Step 6: Create `src/routes/design-a/settings/privacy/+page.svelte`**

```svelte
<div class="max-w-2xl">
	<h1 class="mb-4 text-xl font-bold text-[#1B4F8B]">プライバシーポリシー</h1>
	<article
		class="space-y-4 rounded-sm border border-neutral-200 bg-white p-6 text-sm leading-relaxed"
	>
		<h2 class="font-bold">1. 個人情報の取得</h2>
		<p>当社は、利用者の個人情報を、適法かつ公正な手段により取得いたします。</p>
		<h2 class="font-bold">2. 個人情報の利用目的</h2>
		<p>
			本サービスの提供、本人確認、お問い合わせへの対応、利用規約に違反する行為への対応に利用します。
		</p>
		<h2 class="font-bold">3. 第三者提供</h2>
		<p>法令に基づく場合を除き、利用者の同意なく第三者に個人情報を提供することはありません。</p>
		<h2 class="font-bold">4. 開示・訂正</h2>
		<p>
			利用者ご本人からの個人情報の開示、訂正、削除のご要望には、本人確認の上、合理的な範囲で対応します。
		</p>
	</article>
</div>
```

- [ ] **Step 7: Create `src/routes/design-a/settings/delete/+page.svelte`**

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	let open = $state(false);

	function confirm() {
		open = false;
		alert('退会処理が完了しました（モック）');
		goto('/');
	}
</script>

<div class="max-w-xl">
	<h1 class="mb-4 text-xl font-bold text-red-600">アプリから退会</h1>
	<div class="rounded-sm border border-neutral-200 bg-white p-6">
		<p class="text-sm leading-relaxed text-neutral-700">
			アプリから退会すると、すべてのチャットおよびアカウント情報が削除されます。
			この操作は取り消せません。
		</p>
		<Button variant="destructive" class="mt-4" onclick={() => (open = true)}>退会する</Button>
	</div>

	<AlertDialog.Root bind:open>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>本当に退会しますか？</AlertDialog.Title>
				<AlertDialog.Description>この操作は取り消せません。</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>キャンセル</AlertDialog.Cancel>
				<AlertDialog.Action onclick={confirm}>退会する</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
</div>
```

- [ ] **Step 8: Verify**

Visit each of the 6 settings sub-pages. Confirm:

- Sidebar highlights active item
- Account: edit fields, save (alert), notification toggle works, logout returns to login
- Contact: form submits with alert
- Terms / FAQ / Privacy: text renders
- Delete: confirm dialog appears, navigates to landing

- [ ] **Step 9: Commit**

```bash
git add src/routes/design-a/settings/
git commit -m "feat(design-a): 各種設定ページ（アカウント/お問い合わせ/利用規約/FAQ/プライバシー/退会）"
```

---

## Phase 3: Design B — Modern Workspace

### Task 12: Design B Layout Shell

**Files:**

- Create: `src/routes/design-b/+layout.svelte`
- Create: `src/routes/design-b/+layout.ts`

- [ ] **Step 1: Create `src/routes/design-b/+layout.ts`**

```ts
export const prerender = false;
```

- [ ] **Step 2: Create `src/routes/design-b/+layout.svelte`**

```svelte
<script lang="ts">
	let { children } = $props();
</script>

<div class="design-b min-h-screen bg-neutral-50" data-design="b">
	{@render children()}
</div>

<style>
	:global(.design-b) {
		--accent: #7c3aed;
		--accent-hover: #6d28d9;
		--sidebar-bg: #1a1a2e;
		--sidebar-fg: #e2e8f0;
		--radius: 8px;
	}
</style>
```

Note: Design B's nav lives inside the `chats` / `settings` shells (dark sidebar with chat list embedded), not at the design-root level.

- [ ] **Step 3: Verify**

Run dev. Confirm `/design-b/login` 404s without build errors.

- [ ] **Step 4: Commit**

```bash
git add src/routes/design-b/+layout.svelte src/routes/design-b/+layout.ts
git commit -m "feat(design-b): レイアウトシェルとCSS変数"
```

---

### Task 13: Design B Auth Pages

**Files:**

- Create: `src/routes/design-b/login/+page.svelte`
- Create: `src/routes/design-b/signup/+page.svelte`

- [ ] **Step 1: Create `src/routes/design-b/login/+page.svelte`**

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let email = $state('');
	let password = $state('');

	function submit(e: Event) {
		e.preventDefault();
		alert('ログインしました（モック）');
		goto('/design-b/chats');
	}
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1A1A2E] via-[#16213e] to-[#0f3460] p-8"
>
	<form onsubmit={submit} class="w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl">
		<div class="mb-6 h-12 w-12 rounded-xl bg-[#7C3AED]"></div>
		<h1 class="mb-1 text-2xl font-bold">おかえりなさい</h1>
		<p class="mb-8 text-sm text-neutral-500">アカウントにログイン</p>
		<div class="space-y-5">
			<div class="space-y-2">
				<Label for="email">メールアドレス</Label>
				<Input id="email" type="email" bind:value={email} required class="rounded-lg" />
			</div>
			<div class="space-y-2">
				<Label for="password">パスワード</Label>
				<Input id="password" type="password" bind:value={password} required class="rounded-lg" />
			</div>
		</div>
		<Button type="submit" class="mt-8 h-11 w-full rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9]"
			>ログイン</Button
		>
		<p class="mt-6 text-center text-sm text-neutral-600">
			新規の方は <a href="/design-b/signup" class="font-medium text-[#7C3AED]">登録</a>
		</p>
	</form>
</div>
```

- [ ] **Step 2: Create `src/routes/design-b/signup/+page.svelte`**

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let nickname = $state('');
	let birthDate = $state('');
	let email = $state('');
	let password = $state('');

	function submit(e: Event) {
		e.preventDefault();
		alert('登録しました（モック）');
		goto('/design-b/chats');
	}
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1A1A2E] via-[#16213e] to-[#0f3460] p-8"
>
	<form onsubmit={submit} class="w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl">
		<div class="mb-6 h-12 w-12 rounded-xl bg-[#7C3AED]"></div>
		<h1 class="mb-1 text-2xl font-bold">アカウント作成</h1>
		<p class="mb-8 text-sm text-neutral-500">数項目だけで始められます</p>
		<div class="space-y-4">
			<div class="space-y-2">
				<Label for="nickname">ニックネーム</Label>
				<Input id="nickname" bind:value={nickname} required class="rounded-lg" />
			</div>
			<div class="space-y-2">
				<Label for="birthDate">生年月日</Label>
				<Input id="birthDate" type="date" bind:value={birthDate} required class="rounded-lg" />
			</div>
			<div class="space-y-2">
				<Label for="email">メールアドレス</Label>
				<Input id="email" type="email" bind:value={email} required class="rounded-lg" />
			</div>
			<div class="space-y-2">
				<Label for="password">パスワード</Label>
				<Input id="password" type="password" bind:value={password} required class="rounded-lg" />
			</div>
		</div>
		<Button type="submit" class="mt-8 h-11 w-full rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9]"
			>登録</Button
		>
		<p class="mt-6 text-center text-sm text-neutral-600">
			アカウントをお持ちの方は <a href="/design-b/login" class="font-medium text-[#7C3AED]"
				>ログイン</a
			>
		</p>
	</form>
</div>
```

- [ ] **Step 3: Verify**

Open `/design-b/login` and `/design-b/signup`. Confirm dark gradient background, rounded card, purple accent.

- [ ] **Step 4: Commit**

```bash
git add src/routes/design-b/login/ src/routes/design-b/signup/
git commit -m "feat(design-b): ログイン・新規登録"
```

---

### Task 14: Design B Chat List (Dark Sidebar Shell)

**Files:**

- Create: `src/routes/design-b/chats/+layout.svelte`
- Create: `src/routes/design-b/chats/+page.svelte`

- [ ] **Step 1: Create `src/routes/design-b/chats/+layout.svelte`**

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import { chatStore } from '$lib/stores/chat-store.svelte';
	import { formatChatListTime } from '$lib/shared/format';
	import { Archive, Settings, LogOut } from '@lucide/svelte';

	let { children } = $props();

	const activeChats = $derived(chatStore.activeChats);
	const activeId = $derived(page.params.id);
</script>

<div class="flex h-screen bg-neutral-50">
	<aside class="flex w-[280px] flex-col bg-[#1A1A2E] text-neutral-300">
		<header class="border-b border-white/10 p-5">
			<h1 class="font-semibold text-white">Workspace</h1>
		</header>
		<div class="px-3 pt-4 pb-2 text-xs tracking-wide text-neutral-500 uppercase">チャット</div>
		<ul class="flex-1 space-y-1 overflow-y-auto px-2">
			{#each activeChats as c (c.id)}
				<li>
					<a
						href={`/design-b/chats/${c.id}`}
						class="flex gap-3 rounded-lg p-2.5 hover:bg-white/5 {activeId === c.id
							? 'bg-[#7C3AED]/20 text-white'
							: ''}"
					>
						<img src={c.iconUrl} alt="" class="h-9 w-9 shrink-0 rounded-lg" />
						<div class="min-w-0 flex-1">
							<div class="flex items-baseline justify-between">
								<span class="truncate text-sm font-medium">{c.name}</span>
								<span class="ml-2 shrink-0 text-[10px] text-neutral-500"
									>{formatChatListTime(c.lastMessageAt)}</span
								>
							</div>
							<p class="mt-0.5 truncate text-xs text-neutral-500">
								メンバー {c.memberIds.length}名
							</p>
						</div>
						{#if c.unreadCount > 0}
							<span
								class="self-center rounded-full bg-[#7C3AED] px-1.5 py-0.5 text-[10px] text-white"
								>{c.unreadCount}</span
							>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
		<nav class="space-y-1 border-t border-white/10 p-2">
			<a
				href="/design-b/archive"
				class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/5"
			>
				<Archive class="h-4 w-4" /> 退会済みチャット
			</a>
			<a
				href="/design-b/settings/account"
				class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/5"
			>
				<Settings class="h-4 w-4" /> 設定
			</a>
			<a href="/" class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/5">
				<LogOut class="h-4 w-4" /> デザイン選択に戻る
			</a>
		</nav>
	</aside>
	<section class="min-w-0 flex-1">
		{@render children()}
	</section>
</div>
```

- [ ] **Step 2: Create `src/routes/design-b/chats/+page.svelte`**

```svelte
<div class="flex h-full items-center justify-center">
	<div class="text-center text-neutral-400">
		<p class="text-lg">チャットを選んで会話を始めましょう</p>
	</div>
</div>
```

- [ ] **Step 3: Verify**

Open `/design-b/chats`. Confirm dark sidebar, purple highlight on active chat, footer nav.

- [ ] **Step 4: Commit**

```bash
git add src/routes/design-b/chats/+layout.svelte src/routes/design-b/chats/+page.svelte
git commit -m "feat(design-b): チャット一覧（ダークサイドバー）"
```

---

### Task 15: Design B Chat Detail

**Files:**

- Create: `src/routes/design-b/chats/[id]/+page.svelte`

- [ ] **Step 1: Create `src/routes/design-b/chats/[id]/+page.svelte`**

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import { chatStore } from '$lib/stores/chat-store.svelte';
	import { usersById } from '$lib/mock';
	import { formatTime } from '$lib/shared/format';
	import { Button } from '$lib/components/ui/button';
	import MediaViewer from '$lib/shared/MediaViewer.svelte';
	import { Settings } from '@lucide/svelte';

	const chatId = $derived(page.params.id);
	const chat = $derived(chatStore.getChat(chatId));
	const messages = $derived(chat ? chatStore.getMessages(chatId) : []);

	let input = $state('');
	let viewerOpen = $state(false);
	let viewerSrc = $state('');

	function openImage(src: string) {
		viewerSrc = src;
		viewerOpen = true;
	}

	function send() {
		if (!input.trim()) return;
		chatStore.addMessage(chatId, input);
		input = '';
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) send();
	}

	function isGroupedWithPrev(idx: number): boolean {
		if (idx === 0) return false;
		const prev = messages[idx - 1];
		const cur = messages[idx];
		if (prev.senderId !== cur.senderId) return false;
		return new Date(cur.createdAt).getTime() - new Date(prev.createdAt).getTime() < 5 * 60 * 1000;
	}
</script>

{#if !chat}
	<div class="flex h-full items-center justify-center text-neutral-400">
		チャットが見つかりません
	</div>
{:else}
	<div class="flex h-screen flex-col bg-white">
		<header class="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
			<div class="flex items-center gap-3">
				<img src={chat.iconUrl} alt="" class="h-10 w-10 rounded-lg" />
				<div>
					<h2 class="font-semibold">{chat.name}</h2>
					<p class="text-xs text-neutral-500">{chat.memberIds.length}名のメンバー</p>
				</div>
			</div>
			<a
				href={`/design-b/chats/${chatId}/settings`}
				class="rounded-lg p-2 hover:bg-neutral-100"
				aria-label="設定"
			>
				<Settings class="h-5 w-5 text-neutral-600" />
			</a>
		</header>

		<ul class="flex-1 space-y-1 overflow-y-auto px-6 py-4">
			{#each messages as m, idx (m.id)}
				{@const user = usersById[m.senderId]}
				{@const grouped = isGroupedWithPrev(idx)}
				<li class="flex gap-3 {grouped ? '' : 'mt-4'}">
					<div class="w-10 shrink-0">
						{#if !grouped}
							<img src={user.avatarUrl} alt="" class="h-10 w-10 rounded-lg" />
						{/if}
					</div>
					<div class="min-w-0 flex-1">
						{#if !grouped}
							<div class="mb-1 flex items-baseline gap-2">
								<span class="font-semibold">{user.nickname}</span>
								<span class="text-xs text-neutral-400">{formatTime(m.createdAt)}</span>
							</div>
						{/if}
						{#if m.type === 'text'}
							<p class="text-[15px] whitespace-pre-wrap">{m.body}</p>
						{:else if m.type === 'image'}
							<button
								type="button"
								onclick={() => openImage(m.body)}
								class="block max-w-md overflow-hidden rounded-xl"
							>
								<img src={m.body} alt="" class="h-auto w-full" />
							</button>
						{:else if m.type === 'video'}
							<video controls poster={m.thumbnailUrl} class="max-w-md rounded-xl">
								<source src={m.body} type="video/mp4" />
							</video>
						{/if}
					</div>
				</li>
			{/each}
		</ul>

		<footer class="border-t border-neutral-200 px-6 py-4">
			<div class="flex items-end gap-3">
				<textarea
					bind:value={input}
					onkeydown={handleKey}
					rows="1"
					placeholder="メッセージを入力..."
					class="flex-1 resize-none rounded-xl border border-neutral-300 px-4 py-3 text-[15px] focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 focus:outline-none"
				></textarea>
				<Button onclick={send} class="h-11 rounded-xl bg-[#7C3AED] px-6 hover:bg-[#6D28D9]"
					>送信</Button
				>
			</div>
		</footer>
	</div>

	<MediaViewer bind:open={viewerOpen} src={viewerSrc} />
{/if}
```

- [ ] **Step 2: Verify**

Open `/design-b/chats/c-1`. Confirm message grouping by sender, large avatars, rounded corners, purple focus ring on textarea.

- [ ] **Step 3: Commit**

```bash
git add src/routes/design-b/chats/\[id\]/+page.svelte
git commit -m "feat(design-b): チャット画面（連続発言グループ化）"
```

---

### Task 16: Design B Chat Settings + Archive

**Files:**

- Create: `src/routes/design-b/chats/[id]/settings/+page.svelte`
- Create: `src/routes/design-b/archive/+page.svelte`
- Create: `src/routes/design-b/archive/+layout.svelte` (reuse main sidebar)

- [ ] **Step 1: Create `src/routes/design-b/chats/[id]/settings/+page.svelte`**

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { chatStore } from '$lib/stores/chat-store.svelte';
	import { usersById } from '$lib/mock';
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { ChevronLeft } from '@lucide/svelte';

	const chatId = $derived(page.params.id);
	const chat = $derived(chatStore.getChat(chatId));
	let confirmOpen = $state(false);

	function leave() {
		chatStore.leaveChat(chatId);
		confirmOpen = false;
		goto('/design-b/chats');
	}
</script>

{#if !chat}
	<div class="p-8">チャットが見つかりません</div>
{:else}
	<div class="mx-auto max-w-2xl p-8">
		<a
			href={`/design-b/chats/${chatId}`}
			class="mb-6 inline-flex items-center gap-1 text-sm font-medium text-[#7C3AED]"
		>
			<ChevronLeft class="h-4 w-4" /> 戻る
		</a>
		<div class="rounded-2xl bg-white p-8 shadow-sm">
			<div class="flex items-center gap-4 border-b border-neutral-100 pb-6">
				<img src={chat.iconUrl} alt="" class="h-16 w-16 rounded-2xl" />
				<div>
					<h1 class="text-2xl font-bold">{chat.name}</h1>
					<p class="mt-1 text-sm text-neutral-500">{chat.memberIds.length}名のメンバー</p>
				</div>
			</div>

			<section class="border-b border-neutral-100 py-6">
				<h2 class="mb-4 font-semibold">メンバー</h2>
				<ul class="space-y-3">
					{#each chat.memberIds as id (id)}
						{@const u = usersById[id]}
						<li class="flex items-center gap-3">
							<img src={u.avatarUrl} alt="" class="h-9 w-9 rounded-lg" />
							<span>{u.nickname}</span>
						</li>
					{/each}
				</ul>
			</section>

			<section class="pt-6">
				<h2 class="mb-3 font-semibold text-red-600">危険な操作</h2>
				<Button variant="destructive" class="rounded-xl" onclick={() => (confirmOpen = true)}
					>このチャットから退会する</Button
				>
			</section>
		</div>
	</div>

	<AlertDialog.Root bind:open={confirmOpen}>
		<AlertDialog.Content class="rounded-2xl">
			<AlertDialog.Header>
				<AlertDialog.Title>チャットから退会しますか？</AlertDialog.Title>
				<AlertDialog.Description
					>退会したチャットは「退会済み」一覧から再入会できます。</AlertDialog.Description
				>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>キャンセル</AlertDialog.Cancel>
				<AlertDialog.Action onclick={leave}>退会する</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}
```

- [ ] **Step 2: Create `src/routes/design-b/archive/+page.svelte`**

```svelte
<script lang="ts">
	import { chatStore } from '$lib/stores/chat-store.svelte';
	import { Button } from '$lib/components/ui/button';

	const archived = $derived(chatStore.archivedChats);
</script>

<div class="mx-auto max-w-3xl p-8">
	<h1 class="mb-6 text-2xl font-bold">退会したチャット</h1>
	{#if archived.length === 0}
		<p class="text-neutral-500">退会したチャットはありません。</p>
	{:else}
		<ul class="space-y-3">
			{#each archived as c (c.id)}
				<li class="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
					<img src={c.iconUrl} alt="" class="h-12 w-12 rounded-xl" />
					<div class="flex-1">
						<h2 class="font-semibold">{c.name}</h2>
						<p class="mt-1 text-xs text-neutral-500">メンバー {c.memberIds.length}名</p>
					</div>
					<Button
						class="rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9]"
						onclick={() => chatStore.rejoinChat(c.id)}>再入会</Button
					>
				</li>
			{/each}
		</ul>
	{/if}
</div>
```

- [ ] **Step 3: Verify**

- Leave c-1 via `/design-b/chats/c-1/settings` → returns to chat list, c-1 removed
- Visit `/design-b/archive` → see archived chats, click 再入会 → moves back

- [ ] **Step 4: Commit**

```bash
git add src/routes/design-b/chats/\[id\]/settings/ src/routes/design-b/archive/
git commit -m "feat(design-b): チャット設定（退会）と退会済みチャット一覧"
```

---

### Task 17: Design B Settings Pages

**Files:**

- Create: `src/routes/design-b/settings/+layout.svelte`
- Create: `src/routes/design-b/settings/account/+page.svelte`
- Create: `src/routes/design-b/settings/contact/+page.svelte`
- Create: `src/routes/design-b/settings/terms/+page.svelte`
- Create: `src/routes/design-b/settings/faq/+page.svelte`
- Create: `src/routes/design-b/settings/privacy/+page.svelte`
- Create: `src/routes/design-b/settings/delete/+page.svelte`

- [ ] **Step 1: Create `src/routes/design-b/settings/+layout.svelte` (tab-based nav)**

```svelte
<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();

	const items = [
		{ href: '/design-b/settings/account', label: 'アカウント' },
		{ href: '/design-b/settings/contact', label: 'お問い合わせ' },
		{ href: '/design-b/settings/terms', label: '利用規約' },
		{ href: '/design-b/settings/faq', label: 'FAQ' },
		{ href: '/design-b/settings/privacy', label: 'プライバシー' },
		{ href: '/design-b/settings/delete', label: 'アプリ退会' }
	];
</script>

<div class="mx-auto max-w-5xl p-8">
	<h1 class="mb-6 text-2xl font-bold">設定</h1>
	<nav class="mb-6 flex gap-2 overflow-x-auto border-b border-neutral-200">
		{#each items as it (it.href)}
			<a
				href={it.href}
				class="border-b-2 px-4 py-3 text-sm whitespace-nowrap {page.url.pathname === it.href
					? 'border-[#7C3AED] font-semibold text-[#7C3AED]'
					: 'border-transparent text-neutral-600 hover:text-neutral-900'}"
			>
				{it.label}
			</a>
		{/each}
	</nav>
	{@render children()}
</div>
```

- [ ] **Step 2: Create `src/routes/design-b/settings/account/+page.svelte`**

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import { usersById, CURRENT_USER_ID } from '$lib/mock';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import {
		currentPermission,
		requestNotificationPermission,
		sendTestNotification,
		type NotifyPermission
	} from '$lib/shared/notify';
	import { onMount } from 'svelte';

	const me = usersById[CURRENT_USER_ID];
	let nickname = $state(me.nickname);
	let birthDate = $state(me.birthDate);
	let email = $state(me.email);
	let password = $state('');
	let permission = $state<NotifyPermission>('default');

	onMount(() => {
		permission = currentPermission();
	});

	async function toggleNotify() {
		if (permission === 'granted') {
			alert('ブラウザの設定から通知を無効にしてください');
			return;
		}
		permission = await requestNotificationPermission();
	}

	function save(e: Event) {
		e.preventDefault();
		alert('保存しました（モック）');
	}

	function logout() {
		if (confirm('ログアウトしますか？')) goto('/design-b/login');
	}
</script>

<div class="grid gap-6 md:grid-cols-2">
	<form onsubmit={save} class="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
		<h2 class="mb-2 font-semibold">基本情報</h2>
		<div class="space-y-2">
			<Label for="nickname">ニックネーム</Label>
			<Input id="nickname" bind:value={nickname} class="rounded-lg" />
		</div>
		<div class="space-y-2">
			<Label for="birthDate">生年月日</Label>
			<Input id="birthDate" type="date" bind:value={birthDate} class="rounded-lg" />
		</div>
		<div class="space-y-2">
			<Label for="email">メールアドレス</Label>
			<Input id="email" type="email" bind:value={email} class="rounded-lg" />
		</div>
		<div class="space-y-2">
			<Label for="password">新しいパスワード</Label>
			<Input
				id="password"
				type="password"
				bind:value={password}
				placeholder="変更しない場合は空欄"
				class="rounded-lg"
			/>
		</div>
		<Button type="submit" class="rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9]">保存</Button>
	</form>

	<div class="space-y-6">
		<div class="rounded-2xl bg-white p-6 shadow-sm">
			<h2 class="mb-3 font-semibold">プッシュ通知</h2>
			<div class="mb-3 flex items-center justify-between">
				<span class="text-sm">通知を有効にする</span>
				<Switch
					checked={permission === 'granted'}
					onCheckedChange={toggleNotify}
					disabled={permission === 'unsupported'}
				/>
			</div>
			<p class="mb-3 text-xs text-neutral-500">状態: {permission}</p>
			<Button
				variant="outline"
				class="rounded-xl"
				onclick={() => sendTestNotification()}
				disabled={permission !== 'granted'}>テスト通知</Button
			>
		</div>
		<div class="rounded-2xl bg-white p-6 shadow-sm">
			<Button variant="outline" class="rounded-xl" onclick={logout}>ログアウト</Button>
		</div>
	</div>
</div>
```

- [ ] **Step 3: Create `src/routes/design-b/settings/contact/+page.svelte`**

```svelte
<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let subject = $state('');
	let body = $state('');

	function submit(e: Event) {
		e.preventDefault();
		alert('送信しました（モック）');
		subject = '';
		body = '';
	}
</script>

<form onsubmit={submit} class="max-w-xl space-y-4 rounded-2xl bg-white p-6 shadow-sm">
	<div class="space-y-2">
		<Label for="subject">件名</Label>
		<Input id="subject" bind:value={subject} required class="rounded-lg" />
	</div>
	<div class="space-y-2">
		<Label for="body">お問い合わせ内容</Label>
		<textarea
			id="body"
			bind:value={body}
			required
			rows="8"
			class="w-full rounded-lg border border-neutral-300 p-3 text-sm focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 focus:outline-none"
		></textarea>
	</div>
	<Button type="submit" class="rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9]">送信</Button>
</form>
```

- [ ] **Step 4: Create `src/routes/design-b/settings/terms/+page.svelte`**

```svelte
<article class="max-w-3xl space-y-4 rounded-2xl bg-white p-8 text-[15px] leading-relaxed shadow-sm">
	<h2 class="text-lg font-bold">第1条（適用）</h2>
	<p>
		本規約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。
	</p>
	<h2 class="text-lg font-bold">第2条（利用登録）</h2>
	<p>
		登録希望者が当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。
	</p>
	<h2 class="text-lg font-bold">第3条（禁止事項）</h2>
	<p>
		ユーザーは、本サービスの利用にあたり、法令または公序良俗に違反する行為、犯罪行為に関連する行為、当社のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為等を行ってはなりません。
	</p>
	<h2 class="text-lg font-bold">第4条（本サービスの提供の停止等）</h2>
	<p>
		当社は、本サービスのいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断できるものとします。
	</p>
</article>
```

- [ ] **Step 5: Create `src/routes/design-b/settings/faq/+page.svelte`**

```svelte
<div class="max-w-2xl space-y-3">
	{#each [{ q: 'チャットから退会するには？', a: 'チャット画面右上の設定アイコンから「このチャットから退会する」を選択してください。' }, { q: '退会したチャットに戻りたい', a: 'サイドバーの「退会済みチャット」から再入会できます。' }, { q: '通知が届きません', a: 'アカウント設定の通知を有効にし、ブラウザの権限を確認してください。' }, { q: 'アプリから退会したい', a: '設定 → 「アプリ退会」から手続きできます。' }] as item, i (i)}
		<details class="rounded-2xl bg-white p-5 shadow-sm">
			<summary class="cursor-pointer font-semibold">{item.q}</summary>
			<p class="mt-3 text-sm text-neutral-700">{item.a}</p>
		</details>
	{/each}
</div>
```

- [ ] **Step 6: Create `src/routes/design-b/settings/privacy/+page.svelte`**

```svelte
<article class="max-w-3xl space-y-4 rounded-2xl bg-white p-8 text-[15px] leading-relaxed shadow-sm">
	<h2 class="text-lg font-bold">1. 個人情報の取得</h2>
	<p>当社は、利用者の個人情報を、適法かつ公正な手段により取得いたします。</p>
	<h2 class="text-lg font-bold">2. 個人情報の利用目的</h2>
	<p>
		本サービスの提供、本人確認、お問い合わせへの対応、利用規約に違反する行為への対応に利用します。
	</p>
	<h2 class="text-lg font-bold">3. 第三者提供</h2>
	<p>法令に基づく場合を除き、利用者の同意なく第三者に個人情報を提供することはありません。</p>
	<h2 class="text-lg font-bold">4. 開示・訂正</h2>
	<p>
		利用者ご本人からの個人情報の開示、訂正、削除のご要望には、本人確認の上、合理的な範囲で対応します。
	</p>
</article>
```

- [ ] **Step 7: Create `src/routes/design-b/settings/delete/+page.svelte`**

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	let open = $state(false);

	function confirm() {
		open = false;
		alert('退会処理が完了しました（モック）');
		goto('/');
	}
</script>

<div class="max-w-xl rounded-2xl bg-white p-8 shadow-sm">
	<h2 class="mb-2 text-lg font-bold text-red-600">アプリから退会</h2>
	<p class="text-sm leading-relaxed text-neutral-700">
		アプリから退会すると、すべてのチャットおよびアカウント情報が削除されます。この操作は取り消せません。
	</p>
	<Button variant="destructive" class="mt-4 rounded-xl" onclick={() => (open = true)}
		>退会する</Button
	>
</div>

<AlertDialog.Root bind:open>
	<AlertDialog.Content class="rounded-2xl">
		<AlertDialog.Header>
			<AlertDialog.Title>本当に退会しますか？</AlertDialog.Title>
			<AlertDialog.Description>この操作は取り消せません。</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>キャンセル</AlertDialog.Cancel>
			<AlertDialog.Action onclick={confirm}>退会する</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
```

- [ ] **Step 8: Verify**

Visit each `/design-b/settings/*` URL. Confirm tab nav, white rounded cards, purple accent.

- [ ] **Step 9: Commit**

```bash
git add src/routes/design-b/settings/
git commit -m "feat(design-b): 各種設定ページ"
```

---

## Phase 4: Design C — Friendly Minimal

### Task 18: Design C Layout Shell

**Files:**

- Create: `src/routes/design-c/+layout.svelte`
- Create: `src/routes/design-c/+layout.ts`

- [ ] **Step 1: Create `src/routes/design-c/+layout.ts`**

```ts
export const prerender = false;
```

- [ ] **Step 2: Create `src/routes/design-c/+layout.svelte`**

```svelte
<script lang="ts">
	let { children } = $props();
</script>

<div class="design-c min-h-screen" data-design="c">
	{@render children()}
</div>

<style>
	:global(.design-c) {
		--accent: #ff8a65;
		--accent-hover: #f4733e;
		--bg: #fff8f3;
		--radius: 16px;
		background-color: #fff8f3;
	}
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/routes/design-c/+layout.svelte src/routes/design-c/+layout.ts
git commit -m "feat(design-c): レイアウトシェルとCSS変数"
```

---

### Task 19: Design C Auth Pages

**Files:**

- Create: `src/routes/design-c/login/+page.svelte`
- Create: `src/routes/design-c/signup/+page.svelte`

- [ ] **Step 1: Create `src/routes/design-c/login/+page.svelte`**

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let email = $state('');
	let password = $state('');

	function submit(e: Event) {
		e.preventDefault();
		alert('ログインしました（モック）');
		goto('/design-c/chats');
	}
</script>

<div class="flex min-h-screen items-center justify-center p-8">
	<form
		onsubmit={submit}
		class="w-full max-w-sm rounded-3xl bg-white p-8 shadow-[0_10px_40px_-10px_rgba(255,138,101,0.3)]"
	>
		<div class="mb-8 text-center">
			<div class="mx-auto mb-4 h-16 w-16 rounded-full bg-[#FF8A65]"></div>
			<h1 class="text-2xl font-bold">ようこそ</h1>
			<p class="mt-1 text-sm text-neutral-500">続きから始めましょう</p>
		</div>
		<div class="space-y-4">
			<div class="space-y-2">
				<Label for="email">メールアドレス</Label>
				<Input id="email" type="email" bind:value={email} required class="h-12 rounded-2xl" />
			</div>
			<div class="space-y-2">
				<Label for="password">パスワード</Label>
				<Input
					id="password"
					type="password"
					bind:value={password}
					required
					class="h-12 rounded-2xl"
				/>
			</div>
		</div>
		<Button
			type="submit"
			class="mt-6 h-12 w-full rounded-2xl bg-[#FF8A65] text-base hover:bg-[#F4733E]"
			>ログイン</Button
		>
		<p class="mt-4 text-center text-sm text-neutral-600">
			初めての方は <a href="/design-c/signup" class="font-semibold text-[#FF8A65]">新規登録</a>
		</p>
	</form>
</div>
```

- [ ] **Step 2: Create `src/routes/design-c/signup/+page.svelte`**

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let nickname = $state('');
	let birthDate = $state('');
	let email = $state('');
	let password = $state('');

	function submit(e: Event) {
		e.preventDefault();
		alert('登録しました（モック）');
		goto('/design-c/chats');
	}
</script>

<div class="flex min-h-screen items-center justify-center p-8">
	<form
		onsubmit={submit}
		class="w-full max-w-sm rounded-3xl bg-white p-8 shadow-[0_10px_40px_-10px_rgba(255,138,101,0.3)]"
	>
		<div class="mb-6 text-center">
			<h1 class="text-2xl font-bold">はじめまして</h1>
			<p class="mt-1 text-sm text-neutral-500">アカウントを作成します</p>
		</div>
		<div class="space-y-4">
			<div class="space-y-2">
				<Label for="nickname">ニックネーム</Label>
				<Input id="nickname" bind:value={nickname} required class="h-12 rounded-2xl" />
			</div>
			<div class="space-y-2">
				<Label for="birthDate">生年月日</Label>
				<Input
					id="birthDate"
					type="date"
					bind:value={birthDate}
					required
					class="h-12 rounded-2xl"
				/>
			</div>
			<div class="space-y-2">
				<Label for="email">メールアドレス</Label>
				<Input id="email" type="email" bind:value={email} required class="h-12 rounded-2xl" />
			</div>
			<div class="space-y-2">
				<Label for="password">パスワード</Label>
				<Input
					id="password"
					type="password"
					bind:value={password}
					required
					class="h-12 rounded-2xl"
				/>
			</div>
		</div>
		<Button
			type="submit"
			class="mt-6 h-12 w-full rounded-2xl bg-[#FF8A65] text-base hover:bg-[#F4733E]"
			>登録する</Button
		>
		<p class="mt-4 text-center text-sm text-neutral-600">
			アカウントをお持ちの方は <a href="/design-c/login" class="font-semibold text-[#FF8A65]"
				>ログイン</a
			>
		</p>
	</form>
</div>
```

- [ ] **Step 3: Commit**

```bash
git add src/routes/design-c/login/ src/routes/design-c/signup/
git commit -m "feat(design-c): ログイン・新規登録（柔らかいトーン）"
```

---

### Task 20: Design C Chat List (Single Column + Drawer)

**Files:**

- Create: `src/routes/design-c/chats/+layout.svelte`
- Create: `src/routes/design-c/chats/+page.svelte`

- [ ] **Step 1: Create `src/routes/design-c/chats/+layout.svelte`**

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import { chatStore } from '$lib/stores/chat-store.svelte';
	import { formatChatListTime } from '$lib/shared/format';
	import { Menu, Archive, Settings as Cog, LogOut } from '@lucide/svelte';
	import * as Sheet from '$lib/components/ui/sheet';

	let { children } = $props();

	let drawerOpen = $state(false);
	const activeChats = $derived(chatStore.activeChats);
	const activeId = $derived(page.params.id);
	const onChatList = $derived(!activeId);
</script>

<div class="min-h-screen">
	{#if onChatList}
		<header class="sticky top-0 z-10 flex items-center justify-between bg-[#FFF8F3] px-5 py-4">
			<button
				onclick={() => (drawerOpen = true)}
				aria-label="メニュー"
				class="rounded-xl p-2 hover:bg-[#FF8A65]/10"
			>
				<Menu class="h-6 w-6 text-[#FF8A65]" />
			</button>
			<h1 class="text-lg font-bold">チャット</h1>
			<div class="w-10"></div>
		</header>

		<ul class="mx-auto max-w-2xl space-y-2 px-3 pb-6">
			{#each activeChats as c (c.id)}
				<li>
					<a
						href={`/design-c/chats/${c.id}`}
						class="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
					>
						<img src={c.iconUrl} alt="" class="h-14 w-14 shrink-0 rounded-2xl" />
						<div class="min-w-0 flex-1">
							<div class="flex items-baseline justify-between">
								<span class="truncate font-semibold">{c.name}</span>
								<span class="ml-2 shrink-0 text-xs text-neutral-400"
									>{formatChatListTime(c.lastMessageAt)}</span
								>
							</div>
							<p class="mt-1 truncate text-sm text-neutral-500">メンバー {c.memberIds.length}名</p>
						</div>
						{#if c.unreadCount > 0}
							<span
								class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF8A65] text-xs text-white"
								>{c.unreadCount}</span
							>
						{/if}
					</a>
				</li>
			{/each}
		</ul>

		<Sheet.Root bind:open={drawerOpen}>
			<Sheet.Content side="left" class="border-r-0 bg-[#FFF8F3]">
				<Sheet.Header>
					<Sheet.Title>メニュー</Sheet.Title>
				</Sheet.Header>
				<nav class="mt-6 space-y-1">
					<a
						href="/design-c/chats"
						class="flex items-center gap-3 rounded-2xl p-3 text-base hover:bg-white">チャット</a
					>
					<a
						href="/design-c/archive"
						class="flex items-center gap-3 rounded-2xl p-3 text-base hover:bg-white"
					>
						<Archive class="h-5 w-5" /> 退会したチャット
					</a>
					<a
						href="/design-c/settings/account"
						class="flex items-center gap-3 rounded-2xl p-3 text-base hover:bg-white"
					>
						<Cog class="h-5 w-5" /> 設定
					</a>
					<a href="/" class="flex items-center gap-3 rounded-2xl p-3 text-base hover:bg-white">
						<LogOut class="h-5 w-5" /> デザイン選択へ
					</a>
				</nav>
			</Sheet.Content>
		</Sheet.Root>
	{:else}
		{@render children()}
	{/if}
</div>
```

Note: On `/design-c/chats` the layout renders the list directly (the `+page.svelte` is a no-op). On `/design-c/chats/[id]` the layout falls through to render the detail page via `{@render children()}`.

- [ ] **Step 2: Create `src/routes/design-c/chats/+page.svelte` (empty — list is in layout)**

```svelte
<!-- Chat list is rendered inside the layout when no chat is selected. -->
```

- [ ] **Step 3: Verify**

Open `/design-c/chats`. Confirm single-column list with rounded cards, hamburger opens drawer.

- [ ] **Step 4: Commit**

```bash
git add src/routes/design-c/chats/+layout.svelte src/routes/design-c/chats/+page.svelte
git commit -m "feat(design-c): チャット一覧（単一カラム + ドロワー）"
```

---

### Task 21: Design C Chat Detail (Bubble Style)

**Files:**

- Create: `src/routes/design-c/chats/[id]/+page.svelte`

- [ ] **Step 1: Create `src/routes/design-c/chats/[id]/+page.svelte`**

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import { chatStore } from '$lib/stores/chat-store.svelte';
	import { usersById, CURRENT_USER_ID } from '$lib/mock';
	import { formatTime } from '$lib/shared/format';
	import { Button } from '$lib/components/ui/button';
	import MediaViewer from '$lib/shared/MediaViewer.svelte';
	import { ChevronLeft, Settings } from '@lucide/svelte';

	const chatId = $derived(page.params.id);
	const chat = $derived(chatStore.getChat(chatId));
	const messages = $derived(chat ? chatStore.getMessages(chatId) : []);

	let input = $state('');
	let viewerOpen = $state(false);
	let viewerSrc = $state('');

	function openImage(src: string) {
		viewerSrc = src;
		viewerOpen = true;
	}

	function send() {
		if (!input.trim()) return;
		chatStore.addMessage(chatId, input);
		input = '';
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) send();
	}
</script>

{#if !chat}
	<div class="flex min-h-screen items-center justify-center text-neutral-400">
		チャットが見つかりません
	</div>
{:else}
	<div class="flex h-screen flex-col">
		<header class="sticky top-0 flex items-center justify-between bg-white px-4 py-3 shadow-sm">
			<a href="/design-c/chats" class="rounded-xl p-2 hover:bg-neutral-100" aria-label="戻る">
				<ChevronLeft class="h-6 w-6 text-[#FF8A65]" />
			</a>
			<div class="flex items-center gap-2">
				<img src={chat.iconUrl} alt="" class="h-9 w-9 rounded-xl" />
				<div class="text-center">
					<h2 class="leading-tight font-bold">{chat.name}</h2>
					<p class="text-xs text-neutral-500">{chat.memberIds.length}名</p>
				</div>
			</div>
			<a
				href={`/design-c/chats/${chatId}/settings`}
				class="rounded-xl p-2 hover:bg-neutral-100"
				aria-label="設定"
			>
				<Settings class="h-6 w-6 text-neutral-500" />
			</a>
		</header>

		<ul class="mx-auto w-full max-w-2xl flex-1 space-y-3 overflow-y-auto px-4 py-6">
			{#each messages as m (m.id)}
				{@const user = usersById[m.senderId]}
				{@const isMine = m.senderId === CURRENT_USER_ID}
				<li class="flex {isMine ? 'justify-end' : 'justify-start'} gap-2">
					{#if !isMine}
						<img src={user.avatarUrl} alt="" class="h-9 w-9 shrink-0 self-end rounded-xl" />
					{/if}
					<div class="max-w-[75%] {isMine ? 'items-end' : 'items-start'} flex flex-col">
						{#if !isMine}
							<span class="mb-1 px-2 text-xs text-neutral-500">{user.nickname}</span>
						{/if}
						<div
							class="rounded-3xl px-4 py-3 shadow-sm {isMine
								? 'rounded-br-md bg-[#FF8A65] text-white'
								: 'rounded-bl-md bg-white'}"
						>
							{#if m.type === 'text'}
								<p class="text-[15px] whitespace-pre-wrap">{m.body}</p>
							{:else if m.type === 'image'}
								<button
									type="button"
									onclick={() => openImage(m.body)}
									class="-m-1 block overflow-hidden rounded-2xl"
								>
									<img src={m.body} alt="" class="h-auto w-full max-w-xs" />
								</button>
							{:else if m.type === 'video'}
								<video controls poster={m.thumbnailUrl} class="max-w-xs rounded-2xl">
									<source src={m.body} type="video/mp4" />
								</video>
							{/if}
						</div>
						<span class="mt-1 px-2 text-[10px] text-neutral-400">{formatTime(m.createdAt)}</span>
					</div>
				</li>
			{/each}
		</ul>

		<footer class="border-t border-neutral-200 bg-white px-3 py-3">
			<div class="mx-auto flex max-w-2xl items-end gap-2">
				<textarea
					bind:value={input}
					onkeydown={handleKey}
					rows="1"
					placeholder="メッセージを入力..."
					class="flex-1 resize-none rounded-2xl border border-neutral-200 bg-[#FFF8F3] px-4 py-3 text-[15px] focus:border-[#FF8A65] focus:outline-none"
				></textarea>
				<Button onclick={send} class="h-12 rounded-2xl bg-[#FF8A65] px-6 hover:bg-[#F4733E]"
					>送信</Button
				>
			</div>
		</footer>
	</div>

	<MediaViewer bind:open={viewerOpen} src={viewerSrc} />
{/if}
```

- [ ] **Step 2: Verify**

Open `/design-c/chats/c-1`. Confirm:

- Own messages on right (coral background), others on left (white)
- Bubbles have asymmetric rounded corners (rounded-br-md / rounded-bl-md)
- Image and video render inside bubble

- [ ] **Step 3: Commit**

```bash
git add src/routes/design-c/chats/\[id\]/+page.svelte
git commit -m "feat(design-c): チャット画面（バブルスタイル）"
```

---

### Task 22: Design C Chat Settings + Archive

**Files:**

- Create: `src/routes/design-c/chats/[id]/settings/+page.svelte`
- Create: `src/routes/design-c/archive/+page.svelte`

- [ ] **Step 1: Create `src/routes/design-c/chats/[id]/settings/+page.svelte`**

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { chatStore } from '$lib/stores/chat-store.svelte';
	import { usersById } from '$lib/mock';
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { ChevronLeft } from '@lucide/svelte';

	const chatId = $derived(page.params.id);
	const chat = $derived(chatStore.getChat(chatId));
	let confirmOpen = $state(false);

	function leave() {
		chatStore.leaveChat(chatId);
		confirmOpen = false;
		goto('/design-c/chats');
	}
</script>

{#if !chat}
	<div class="p-8">チャットが見つかりません</div>
{:else}
	<div class="min-h-screen">
		<header class="sticky top-0 flex items-center bg-white px-4 py-3 shadow-sm">
			<a
				href={`/design-c/chats/${chatId}`}
				class="rounded-xl p-2 hover:bg-neutral-100"
				aria-label="戻る"
			>
				<ChevronLeft class="h-6 w-6 text-[#FF8A65]" />
			</a>
			<h1 class="ml-2 font-bold">チャット設定</h1>
		</header>

		<div class="mx-auto max-w-2xl space-y-4 p-4">
			<div class="rounded-3xl bg-white p-6 text-center">
				<img src={chat.iconUrl} alt="" class="mx-auto mb-3 h-20 w-20 rounded-3xl" />
				<h2 class="text-xl font-bold">{chat.name}</h2>
				<p class="mt-1 text-sm text-neutral-500">{chat.memberIds.length}名のメンバー</p>
			</div>

			<section class="rounded-3xl bg-white p-6">
				<h2 class="mb-4 font-bold">メンバー</h2>
				<ul class="space-y-3">
					{#each chat.memberIds as id (id)}
						{@const u = usersById[id]}
						<li class="flex items-center gap-3">
							<img src={u.avatarUrl} alt="" class="h-10 w-10 rounded-2xl" />
							<span>{u.nickname}</span>
						</li>
					{/each}
				</ul>
			</section>

			<section class="rounded-3xl bg-white p-6">
				<Button
					variant="destructive"
					class="h-12 w-full rounded-2xl"
					onclick={() => (confirmOpen = true)}
				>
					このチャットから退会する
				</Button>
			</section>
		</div>
	</div>

	<AlertDialog.Root bind:open={confirmOpen}>
		<AlertDialog.Content class="rounded-3xl">
			<AlertDialog.Header>
				<AlertDialog.Title>退会しますか？</AlertDialog.Title>
				<AlertDialog.Description
					>退会したチャットは「退会したチャット」から再入会できます。</AlertDialog.Description
				>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel class="rounded-2xl">キャンセル</AlertDialog.Cancel>
				<AlertDialog.Action class="rounded-2xl" onclick={leave}>退会する</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}
```

- [ ] **Step 2: Create `src/routes/design-c/archive/+page.svelte`**

```svelte
<script lang="ts">
	import { chatStore } from '$lib/stores/chat-store.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ChevronLeft } from '@lucide/svelte';

	const archived = $derived(chatStore.archivedChats);
</script>

<div class="min-h-screen">
	<header class="sticky top-0 flex items-center bg-white px-4 py-3 shadow-sm">
		<a href="/design-c/chats" class="rounded-xl p-2 hover:bg-neutral-100" aria-label="戻る">
			<ChevronLeft class="h-6 w-6 text-[#FF8A65]" />
		</a>
		<h1 class="ml-2 font-bold">退会したチャット</h1>
	</header>

	<div class="mx-auto max-w-2xl p-4">
		{#if archived.length === 0}
			<p class="mt-12 text-center text-neutral-500">退会したチャットはありません</p>
		{:else}
			<ul class="space-y-3">
				{#each archived as c (c.id)}
					<li class="flex items-center gap-4 rounded-3xl bg-white p-5">
						<img src={c.iconUrl} alt="" class="h-14 w-14 rounded-2xl" />
						<div class="flex-1">
							<h2 class="font-semibold">{c.name}</h2>
							<p class="mt-1 text-xs text-neutral-500">メンバー {c.memberIds.length}名</p>
						</div>
						<Button
							class="rounded-2xl bg-[#FF8A65] hover:bg-[#F4733E]"
							onclick={() => chatStore.rejoinChat(c.id)}>再入会</Button
						>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
```

- [ ] **Step 3: Verify**

- Leave c-2 in design-c → list updates
- `/design-c/archive` shows archived list, 再入会 works

- [ ] **Step 4: Commit**

```bash
git add src/routes/design-c/chats/\[id\]/settings/ src/routes/design-c/archive/
git commit -m "feat(design-c): チャット設定と退会済みチャット一覧"
```

---

### Task 23: Design C Settings Pages

**Files:**

- Create: `src/routes/design-c/settings/+layout.svelte`
- Create: `src/routes/design-c/settings/account/+page.svelte`
- Create: `src/routes/design-c/settings/contact/+page.svelte`
- Create: `src/routes/design-c/settings/terms/+page.svelte`
- Create: `src/routes/design-c/settings/faq/+page.svelte`
- Create: `src/routes/design-c/settings/privacy/+page.svelte`
- Create: `src/routes/design-c/settings/delete/+page.svelte`

- [ ] **Step 1: Create `src/routes/design-c/settings/+layout.svelte` (list-style nav)**

```svelte
<script lang="ts">
	import { page } from '$app/state';
	import { ChevronLeft } from '@lucide/svelte';

	let { children } = $props();

	const items = [
		{ href: '/design-c/settings/account', label: 'アカウント' },
		{ href: '/design-c/settings/contact', label: 'お問い合わせ' },
		{ href: '/design-c/settings/terms', label: '利用規約' },
		{ href: '/design-c/settings/faq', label: 'よくあるご質問' },
		{ href: '/design-c/settings/privacy', label: 'プライバシーポリシー' },
		{ href: '/design-c/settings/delete', label: 'アプリから退会' }
	];

	const isIndex = $derived(page.url.pathname === '/design-c/settings/account');
</script>

<div class="min-h-screen">
	<header class="sticky top-0 z-10 flex items-center bg-white px-4 py-3 shadow-sm">
		<a href="/design-c/chats" class="rounded-xl p-2 hover:bg-neutral-100" aria-label="戻る">
			<ChevronLeft class="h-6 w-6 text-[#FF8A65]" />
		</a>
		<h1 class="ml-2 font-bold">設定</h1>
	</header>

	<div class="mx-auto grid max-w-2xl gap-4 p-4 md:grid-cols-[200px_1fr]">
		<nav class="h-fit rounded-3xl bg-white p-2">
			{#each items as it (it.href)}
				<a
					href={it.href}
					class="block rounded-2xl px-4 py-3 text-sm {page.url.pathname === it.href
						? 'bg-[#FF8A65] font-semibold text-white'
						: 'hover:bg-neutral-50'}"
				>
					{it.label}
				</a>
			{/each}
		</nav>
		<div>
			{@render children()}
		</div>
	</div>
</div>
```

- [ ] **Step 2: Create `src/routes/design-c/settings/account/+page.svelte`**

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import { usersById, CURRENT_USER_ID } from '$lib/mock';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import {
		currentPermission,
		requestNotificationPermission,
		sendTestNotification,
		type NotifyPermission
	} from '$lib/shared/notify';
	import { onMount } from 'svelte';

	const me = usersById[CURRENT_USER_ID];
	let nickname = $state(me.nickname);
	let birthDate = $state(me.birthDate);
	let email = $state(me.email);
	let password = $state('');
	let permission = $state<NotifyPermission>('default');

	onMount(() => {
		permission = currentPermission();
	});

	async function toggleNotify() {
		if (permission === 'granted') {
			alert('ブラウザの設定から通知を無効にしてください');
			return;
		}
		permission = await requestNotificationPermission();
	}

	function save(e: Event) {
		e.preventDefault();
		alert('保存しました（モック）');
	}

	function logout() {
		if (confirm('ログアウトしますか？')) goto('/design-c/login');
	}
</script>

<div class="space-y-4">
	<form onsubmit={save} class="space-y-4 rounded-3xl bg-white p-6">
		<h2 class="font-bold">基本情報</h2>
		<div class="space-y-2">
			<Label for="nickname">ニックネーム</Label>
			<Input id="nickname" bind:value={nickname} class="h-12 rounded-2xl" />
		</div>
		<div class="space-y-2">
			<Label for="birthDate">生年月日</Label>
			<Input id="birthDate" type="date" bind:value={birthDate} class="h-12 rounded-2xl" />
		</div>
		<div class="space-y-2">
			<Label for="email">メールアドレス</Label>
			<Input id="email" type="email" bind:value={email} class="h-12 rounded-2xl" />
		</div>
		<div class="space-y-2">
			<Label for="password">新しいパスワード</Label>
			<Input
				id="password"
				type="password"
				bind:value={password}
				placeholder="変更しない場合は空欄"
				class="h-12 rounded-2xl"
			/>
		</div>
		<Button type="submit" class="h-12 w-full rounded-2xl bg-[#FF8A65] hover:bg-[#F4733E]"
			>保存</Button
		>
	</form>

	<div class="rounded-3xl bg-white p-6">
		<h2 class="mb-3 font-bold">プッシュ通知</h2>
		<div class="mb-3 flex items-center justify-between">
			<span>通知を有効にする</span>
			<Switch
				checked={permission === 'granted'}
				onCheckedChange={toggleNotify}
				disabled={permission === 'unsupported'}
			/>
		</div>
		<p class="mb-3 text-xs text-neutral-500">状態: {permission}</p>
		<Button
			variant="outline"
			class="h-12 w-full rounded-2xl"
			onclick={() => sendTestNotification()}
			disabled={permission !== 'granted'}
		>
			テスト通知を送る
		</Button>
	</div>

	<div class="rounded-3xl bg-white p-6">
		<Button variant="outline" class="h-12 w-full rounded-2xl" onclick={logout}>ログアウト</Button>
	</div>
</div>
```

- [ ] **Step 3: Create `src/routes/design-c/settings/contact/+page.svelte`**

```svelte
<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let subject = $state('');
	let body = $state('');

	function submit(e: Event) {
		e.preventDefault();
		alert('送信しました（モック）');
		subject = '';
		body = '';
	}
</script>

<form onsubmit={submit} class="space-y-4 rounded-3xl bg-white p-6">
	<div class="space-y-2">
		<Label for="subject">件名</Label>
		<Input id="subject" bind:value={subject} required class="h-12 rounded-2xl" />
	</div>
	<div class="space-y-2">
		<Label for="body">お問い合わせ内容</Label>
		<textarea
			id="body"
			bind:value={body}
			required
			rows="8"
			class="w-full rounded-2xl border border-neutral-200 p-3 focus:border-[#FF8A65] focus:outline-none"
		></textarea>
	</div>
	<Button type="submit" class="h-12 w-full rounded-2xl bg-[#FF8A65] hover:bg-[#F4733E]">送信</Button
	>
</form>
```

- [ ] **Step 4: Create `src/routes/design-c/settings/terms/+page.svelte`**

```svelte
<article class="space-y-4 rounded-3xl bg-white p-6 text-[15px] leading-relaxed">
	<h2 class="font-bold">第1条（適用）</h2>
	<p>
		本規約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。
	</p>
	<h2 class="font-bold">第2条（利用登録）</h2>
	<p>
		登録希望者が当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。
	</p>
	<h2 class="font-bold">第3条（禁止事項）</h2>
	<p>
		ユーザーは、本サービスの利用にあたり、法令または公序良俗に違反する行為、犯罪行為に関連する行為、当社のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為等を行ってはなりません。
	</p>
	<h2 class="font-bold">第4条（本サービスの提供の停止等）</h2>
	<p>
		当社は、本サービスのいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断できるものとします。
	</p>
</article>
```

- [ ] **Step 5: Create `src/routes/design-c/settings/faq/+page.svelte`**

```svelte
<div class="space-y-3">
	{#each [{ q: 'チャットから退会するには？', a: 'チャット画面右上の設定アイコンから「このチャットから退会する」を選択してください。' }, { q: '退会したチャットに戻りたい', a: 'メニュー → 「退会したチャット」から再入会できます。' }, { q: '通知が届きません', a: 'アカウント設定の通知を有効にし、ブラウザの権限を確認してください。' }, { q: 'アプリから退会したい', a: '設定 → 「アプリから退会」から手続きできます。' }] as item, i (i)}
		<details class="rounded-3xl bg-white p-5">
			<summary class="cursor-pointer font-semibold">{item.q}</summary>
			<p class="mt-3 text-sm text-neutral-700">{item.a}</p>
		</details>
	{/each}
</div>
```

- [ ] **Step 6: Create `src/routes/design-c/settings/privacy/+page.svelte`**

```svelte
<article class="space-y-4 rounded-3xl bg-white p-6 text-[15px] leading-relaxed">
	<h2 class="font-bold">1. 個人情報の取得</h2>
	<p>当社は、利用者の個人情報を、適法かつ公正な手段により取得いたします。</p>
	<h2 class="font-bold">2. 個人情報の利用目的</h2>
	<p>
		本サービスの提供、本人確認、お問い合わせへの対応、利用規約に違反する行為への対応に利用します。
	</p>
	<h2 class="font-bold">3. 第三者提供</h2>
	<p>法令に基づく場合を除き、利用者の同意なく第三者に個人情報を提供することはありません。</p>
	<h2 class="font-bold">4. 開示・訂正</h2>
	<p>
		利用者ご本人からの個人情報の開示、訂正、削除のご要望には、本人確認の上、合理的な範囲で対応します。
	</p>
</article>
```

- [ ] **Step 7: Create `src/routes/design-c/settings/delete/+page.svelte`**

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	let open = $state(false);

	function confirm() {
		open = false;
		alert('退会処理が完了しました（モック）');
		goto('/');
	}
</script>

<div class="rounded-3xl bg-white p-6">
	<h2 class="mb-3 font-bold text-red-600">アプリから退会</h2>
	<p class="text-sm leading-relaxed text-neutral-700">
		アプリから退会すると、すべてのチャットおよびアカウント情報が削除されます。この操作は取り消せません。
	</p>
	<Button variant="destructive" class="mt-4 h-12 w-full rounded-2xl" onclick={() => (open = true)}
		>退会する</Button
	>
</div>

<AlertDialog.Root bind:open>
	<AlertDialog.Content class="rounded-3xl">
		<AlertDialog.Header>
			<AlertDialog.Title>本当に退会しますか？</AlertDialog.Title>
			<AlertDialog.Description>この操作は取り消せません。</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel class="rounded-2xl">キャンセル</AlertDialog.Cancel>
			<AlertDialog.Action class="rounded-2xl" onclick={confirm}>退会する</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
```

- [ ] **Step 8: Verify**

Open each `/design-c/settings/*` URL. Confirm rounded list-nav on left, content card on right (or stacked on tablet portrait), coral accent.

- [ ] **Step 9: Commit**

```bash
git add src/routes/design-c/settings/
git commit -m "feat(design-c): 各種設定ページ"
```

---

## Phase 5: Verification

### Task 24: Type Check + Lint

- [ ] **Step 1: Run type check**

Run: `npm run check`
Expected: PASS (0 errors)

- [ ] **Step 2: Run lint (auto-fix where possible)**

Run: `npm run format && npm run lint`
Expected: PASS

- [ ] **Step 3: If anything fails, fix it inline and re-run until clean.**

- [ ] **Step 4: Commit any format/lint fixes**

```bash
git add -A
git commit -m "chore: フォーマット・lint適用" || echo "no changes"
```

---

### Task 25: Visual Verification

- [ ] **Step 1: Start dev server**

Run: `npm run dev`

- [ ] **Step 2: For each design (a/b/c), open in browser at the following sizes:**

Sizes:

- PC: 1440×900
- Tablet 8" landscape: 1024×768
- Tablet 8" portrait: 768×1024

URLs (replace `{x}` with a/b/c):

- `http://localhost:5173/`
- `http://localhost:5173/design-{x}/login`
- `http://localhost:5173/design-{x}/signup`
- `http://localhost:5173/design-{x}/chats`
- `http://localhost:5173/design-{x}/chats/c-1` (with text/image/video messages)
- `http://localhost:5173/design-{x}/chats/c-1/settings`
- `http://localhost:5173/design-{x}/archive`
- `http://localhost:5173/design-{x}/settings/account`
- `http://localhost:5173/design-{x}/settings/contact`
- `http://localhost:5173/design-{x}/settings/terms`
- `http://localhost:5173/design-{x}/settings/faq`
- `http://localhost:5173/design-{x}/settings/privacy`
- `http://localhost:5173/design-{x}/settings/delete`

- [ ] **Step 3: For each URL, confirm:**

- No horizontal scrollbar at any size
- Text is readable (no overflow / clipping)
- Interactive elements (buttons, inputs, links) are at least 32×32 px hit area
- Images / videos load
- Design-specific colors and shapes match the spec

- [ ] **Step 4: Test the round-trip flows for each design:**

1. `/` → click design card → `/design-{x}/login` → submit → `/design-{x}/chats`
2. Click a chat → see messages → click image → modal opens; close modal
3. Send a message → appears in list
4. Open chat settings → 退会 → confirm → returns to list; chat gone
5. Open archive → 再入会 → chat returns to active list
6. Open settings/account → toggle 通知 → permission requested → send test notification (works if granted)
7. Open settings/delete → 退会 → confirm → returns to `/`

- [ ] **Step 5: If issues found, fix and commit.**

- [ ] **Step 6: Final commit if needed and stop dev server**

```bash
git add -A && git commit -m "fix: 視覚検証で見つかった崩れの修正" || echo "no changes"
```

---

## Done Criteria

- ✅ `/` shows 3 design choices
- ✅ Each `/design-{a|b|c}/*` route renders without errors at PC and tablet sizes
- ✅ Chat list → detail → settings → leave → archive → rejoin loop works in all 3 designs
- ✅ Text / image / video messages all render and play
- ✅ Push notification toggle calls Notification API and sends a test notification
- ✅ `npm run check` and `npm run lint` pass
