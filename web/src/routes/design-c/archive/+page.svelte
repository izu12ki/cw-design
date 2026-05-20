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
