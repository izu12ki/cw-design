<script lang="ts">
  import { chatStore } from '$lib/stores/chat-store.svelte';
  import { Button } from '$lib/components/ui/button';
  import { ChevronLeft } from '@lucide/svelte';

  const archived = $derived(chatStore.archivedChats);
</script>

<div class="min-h-screen">
  <header class="flex items-center px-4 py-3 bg-white shadow-sm sticky top-0">
    <a href="/design-c/chats" class="p-2 rounded-xl hover:bg-neutral-100" aria-label="戻る">
      <ChevronLeft class="w-6 h-6 text-[#FF8A65]" />
    </a>
    <h1 class="font-bold ml-2">退会したチャット</h1>
  </header>

  <div class="max-w-2xl mx-auto p-4">
    {#if archived.length === 0}
      <p class="text-center text-neutral-500 mt-12">退会したチャットはありません</p>
    {:else}
      <ul class="space-y-3">
        {#each archived as c (c.id)}
          <li class="bg-white rounded-3xl p-5 flex items-center gap-4">
            <img src={c.iconUrl} alt="" class="w-14 h-14 rounded-2xl" />
            <div class="flex-1">
              <h2 class="font-semibold">{c.name}</h2>
              <p class="text-xs text-neutral-500 mt-1">メンバー {c.memberIds.length}名</p>
            </div>
            <Button class="bg-[#FF8A65] hover:bg-[#F4733E] rounded-2xl" onclick={() => chatStore.rejoinChat(c.id)}>再入会</Button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
