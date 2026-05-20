<script lang="ts">
  import { page } from '$app/state';
  import { chatStore } from '$lib/stores/chat-store.svelte';
  import { usersById } from '$lib/mock';
  import { formatTime } from '$lib/shared/format';
  import { Button } from '$lib/components/ui/button';
  import MediaViewer from '$lib/shared/MediaViewer.svelte';
  import { Settings } from '@lucide/svelte';

  const chatId = $derived(page.params.id ?? '');
  const chat = $derived(chatStore.getChat(chatId));
  const messages = $derived(chat ? chatStore.getMessages(chatId) : []);

  let input = $state('');
  let viewerOpen = $state(false);
  let viewerSrc = $state('');

  function openImage(src: string) {
    viewerSrc = src;
    viewerOpen = true;
  }

  function send() {
    if (!input.trim()) return;
    chatStore.addMessage(chatId, input);
    input = '';
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) send();
  }

  function isGroupedWithPrev(idx: number): boolean {
    if (idx === 0) return false;
    const prev = messages[idx - 1];
    const cur = messages[idx];
    if (prev.senderId !== cur.senderId) return false;
    return new Date(cur.createdAt).getTime() - new Date(prev.createdAt).getTime() < 5 * 60 * 1000;
  }
</script>

{#if !chat}
  <div class="h-full flex items-center justify-center text-neutral-400">チャットが見つかりません</div>
{:else}
  <div class="flex flex-col h-screen bg-white">
    <header class="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
      <div class="flex items-center gap-3">
        <img src={chat.iconUrl} alt="" class="w-10 h-10 rounded-lg" />
        <div>
          <h2 class="font-semibold">{chat.name}</h2>
          <p class="text-xs text-neutral-500">{chat.memberIds.length}名のメンバー</p>
        </div>
      </div>
      <a href={`/design-b/chats/${chatId}/settings`} class="p-2 hover:bg-neutral-100 rounded-lg" aria-label="設定">
        <Settings class="w-5 h-5 text-neutral-600" />
      </a>
    </header>

    <ul class="flex-1 overflow-y-auto px-6 py-4 space-y-1">
      {#each messages as m, idx (m.id)}
        {@const user = usersById[m.senderId]}
        {@const grouped = isGroupedWithPrev(idx)}
        <li class="flex gap-3 {grouped ? '' : 'mt-4'}">
          <div class="w-10 shrink-0">
            {#if !grouped}
              <img src={user.avatarUrl} alt="" class="w-10 h-10 rounded-lg" />
            {/if}
          </div>
          <div class="flex-1 min-w-0">
            {#if !grouped}
              <div class="flex items-baseline gap-2 mb-1">
                <span class="font-semibold">{user.nickname}</span>
                <span class="text-xs text-neutral-400">{formatTime(m.createdAt)}</span>
              </div>
            {/if}
            {#if m.type === 'text'}
              <p class="whitespace-pre-wrap text-[15px]">{m.body}</p>
            {:else if m.type === 'image'}
              <button type="button" onclick={() => openImage(m.body)} class="block max-w-md rounded-xl overflow-hidden">
                <img src={m.body} alt="" class="w-full h-auto" />
              </button>
            {:else if m.type === 'video'}
              <video controls poster={m.thumbnailUrl} class="max-w-md rounded-xl">
                <source src={m.body} type="video/mp4" />
              </video>
            {/if}
          </div>
        </li>
      {/each}
    </ul>

    <footer class="px-6 py-4 border-t border-neutral-200">
      <div class="flex gap-3 items-end">
        <textarea
          bind:value={input}
          onkeydown={handleKey}
          rows="1"
          placeholder="メッセージを入力..."
          class="flex-1 resize-none border border-neutral-300 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
        ></textarea>
        <Button onclick={send} class="bg-[#7C3AED] hover:bg-[#6D28D9] rounded-xl h-11 px-6">送信</Button>
      </div>
    </footer>
  </div>

  <MediaViewer bind:open={viewerOpen} src={viewerSrc} />
{/if}
