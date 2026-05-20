<script lang="ts">
  import { page } from '$app/state';
  import { chatStore } from '$lib/stores/chat-store.svelte';
  import { formatChatListTime } from '$lib/shared/format';

  let { children } = $props();

  const activeChats = $derived(chatStore.activeChats);
  const activeId = $derived(page.params.id);
</script>

<div class="flex h-screen">
  <aside class="w-[280px] border-r border-neutral-200 bg-white flex flex-col">
    <header class="p-4 border-b border-neutral-200">
      <h1 class="font-bold text-[#1B4F8B]">チャット</h1>
    </header>
    <ul class="flex-1 overflow-y-auto">
      {#each activeChats as c (c.id)}
        <li>
          <a
            href={`/design-a/chats/${c.id}`}
            class="flex gap-3 p-3 border-b border-neutral-100 hover:bg-neutral-50 {activeId === c.id ? 'bg-[#E8F0FA]' : ''}"
          >
            <img src={c.iconUrl} alt="" class="w-10 h-10 rounded-sm" />
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-baseline">
                <span class="font-medium truncate text-sm">{c.name}</span>
                <span class="text-xs text-neutral-500 shrink-0 ml-2">{formatChatListTime(c.lastMessageAt)}</span>
              </div>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="text-xs text-neutral-500 truncate">メンバー {c.memberIds.length}名</span>
                {#if c.unreadCount > 0}
                  <span class="ml-auto bg-[#1B4F8B] text-white text-[10px] rounded-full px-1.5 py-0.5">{c.unreadCount}</span>
                {/if}
              </div>
            </div>
          </a>
        </li>
      {/each}
    </ul>
  </aside>
  <section class="flex-1 min-w-0">
    {@render children()}
  </section>
</div>
