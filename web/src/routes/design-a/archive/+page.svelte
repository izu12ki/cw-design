<script lang="ts">
  import { chatStore } from '$lib/stores/chat-store.svelte';
  import { Button } from '$lib/components/ui/button';

  const archived = $derived(chatStore.archivedChats);
</script>

<div class="max-w-3xl mx-auto p-6">
  <h1 class="text-xl font-bold text-[#1B4F8B] mb-4">退会したチャット</h1>
  {#if archived.length === 0}
    <p class="text-neutral-500 text-sm">退会したチャットはありません。</p>
  {:else}
    <ul class="space-y-2">
      {#each archived as c (c.id)}
        <li class="bg-white border border-neutral-200 rounded-sm p-4 flex items-center gap-4">
          <img src={c.iconUrl} alt="" class="w-12 h-12 rounded-sm" />
          <div class="flex-1">
            <h2 class="font-medium">{c.name}</h2>
            <p class="text-xs text-neutral-500">メンバー {c.memberIds.length}名</p>
          </div>
          <Button class="bg-[#1B4F8B] hover:bg-[#163D6D]" onclick={() => chatStore.rejoinChat(c.id)}>再入会</Button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
