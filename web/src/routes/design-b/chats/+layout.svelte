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
  <aside class="w-[280px] bg-[#1A1A2E] text-neutral-300 flex flex-col">
    <header class="p-5 border-b border-white/10">
      <h1 class="text-white font-semibold">Workspace</h1>
    </header>
    <div class="px-3 pt-4 pb-2 text-xs uppercase tracking-wide text-neutral-500">チャット</div>
    <ul class="flex-1 overflow-y-auto px-2 space-y-1">
      {#each activeChats as c (c.id)}
        <li>
          <a
            href={`/design-b/chats/${c.id}`}
            class="flex gap-3 p-2.5 rounded-lg hover:bg-white/5 {activeId === c.id ? 'bg-[#7C3AED]/20 text-white' : ''}"
          >
            <img src={c.iconUrl} alt="" class="w-9 h-9 rounded-lg shrink-0" />
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-baseline">
                <span class="font-medium truncate text-sm">{c.name}</span>
                <span class="text-[10px] text-neutral-500 shrink-0 ml-2">{formatChatListTime(c.lastMessageAt)}</span>
              </div>
              <p class="text-xs text-neutral-500 truncate mt-0.5">メンバー {c.memberIds.length}名</p>
            </div>
            {#if c.unreadCount > 0}
              <span class="self-center bg-[#7C3AED] text-white text-[10px] rounded-full px-1.5 py-0.5">{c.unreadCount}</span>
            {/if}
          </a>
        </li>
      {/each}
    </ul>
    <nav class="p-2 border-t border-white/10 space-y-1">
      <a href="/design-b/archive" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-sm">
        <Archive class="w-4 h-4" /> 退会済みチャット
      </a>
      <a href="/design-b/settings/account" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-sm">
        <Settings class="w-4 h-4" /> 設定
      </a>
      <a href="/" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-sm">
        <LogOut class="w-4 h-4" /> デザイン選択に戻る
      </a>
    </nav>
  </aside>
  <section class="flex-1 min-w-0">
    {@render children()}
  </section>
</div>
