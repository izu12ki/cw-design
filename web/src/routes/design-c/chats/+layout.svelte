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
    <header class="flex items-center justify-between px-5 py-4 sticky top-0 bg-[#FFF8F3] z-10">
      <button onclick={() => (drawerOpen = true)} aria-label="メニュー" class="p-2 rounded-xl hover:bg-[#FF8A65]/10">
        <Menu class="w-6 h-6 text-[#FF8A65]" />
      </button>
      <h1 class="font-bold text-lg">チャット</h1>
      <div class="w-10"></div>
    </header>

    <ul class="px-3 pb-6 max-w-2xl mx-auto space-y-2">
      {#each activeChats as c (c.id)}
        <li>
          <a href={`/design-c/chats/${c.id}`} class="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <img src={c.iconUrl} alt="" class="w-14 h-14 rounded-2xl shrink-0" />
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-baseline">
                <span class="font-semibold truncate">{c.name}</span>
                <span class="text-xs text-neutral-400 shrink-0 ml-2">{formatChatListTime(c.lastMessageAt)}</span>
              </div>
              <p class="text-sm text-neutral-500 truncate mt-1">メンバー {c.memberIds.length}名</p>
            </div>
            {#if c.unreadCount > 0}
              <span class="bg-[#FF8A65] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shrink-0">{c.unreadCount}</span>
            {/if}
          </a>
        </li>
      {/each}
    </ul>

    <Sheet.Root bind:open={drawerOpen}>
      <Sheet.Content side="left" class="bg-[#FFF8F3] border-r-0">
        <Sheet.Header>
          <Sheet.Title>メニュー</Sheet.Title>
        </Sheet.Header>
        <nav class="space-y-1 mt-6">
          <a href="/design-c/chats" class="flex items-center gap-3 p-3 rounded-2xl hover:bg-white text-base">チャット</a>
          <a href="/design-c/archive" class="flex items-center gap-3 p-3 rounded-2xl hover:bg-white text-base">
            <Archive class="w-5 h-5" /> 退会したチャット
          </a>
          <a href="/design-c/settings/account" class="flex items-center gap-3 p-3 rounded-2xl hover:bg-white text-base">
            <Cog class="w-5 h-5" /> 設定
          </a>
          <a href="/" class="flex items-center gap-3 p-3 rounded-2xl hover:bg-white text-base">
            <LogOut class="w-5 h-5" /> デザイン選択へ
          </a>
        </nav>
      </Sheet.Content>
    </Sheet.Root>
  {:else}
    {@render children()}
  {/if}
</div>
