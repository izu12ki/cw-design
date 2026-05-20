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
