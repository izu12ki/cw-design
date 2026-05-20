<script lang="ts">
  import { chatStore } from '$lib/stores/chat-store.svelte';
  import { Button } from '$lib/components/ui/button';

  const archived = $derived(chatStore.archivedChats);
</script>

<div class="max-w-3xl mx-auto p-8">
  <h1 class="text-2xl font-bold mb-6">退会したチャット</h1>
  {#if archived.length === 0}
    <p class="text-neutral-500">退会したチャットはありません。</p>
  {:else}
    <ul class="space-y-3">
      {#each archived as c (c.id)}
        <li class="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <img src={c.iconUrl} alt="" class="w-12 h-12 rounded-xl" />
          <div class="flex-1">
            <h2 class="font-semibold">{c.name}</h2>
            <p class="text-xs text-neutral-500 mt-1">メンバー {c.memberIds.length}名</p>
          </div>
          <Button class="bg-[#7C3AED] hover:bg-[#6D28D9] rounded-xl" onclick={() => chatStore.rejoinChat(c.id)}>再入会</Button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
