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
