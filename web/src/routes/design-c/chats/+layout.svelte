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
