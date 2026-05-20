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
