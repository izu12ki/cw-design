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
