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
</script>

{#if !chat}
  <div class="h-full flex items-center justify-center text-neutral-400">チャットが見つかりません</div>
{:else}
  <div class="flex flex-col h-screen">
    <header class="flex items-center justify-between p-3 border-b border-neutral-200 bg-white">
      <div class="flex items-center gap-3">
        <img src={chat.iconUrl} alt="" class="w-9 h-9 rounded-sm" />
        <div>
          <h2 class="font-bold text-sm text-[#1B4F8B]">{chat.name}</h2>
          <p class="text-xs text-neutral-500">メンバー {chat.memberIds.length}名</p>
        </div>
      </div>
      <a href={`/design-a/chats/${chatId}/settings`} class="p-2 hover:bg-neutral-100 rounded" aria-label="設定">
        <Settings class="w-4 h-4 text-neutral-600" />
      </a>
    </header>

    <ul class="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50">
      {#each messages as m (m.id)}
        {@const user = usersById[m.senderId]}
        <li class="flex gap-3">
          <img src={user.avatarUrl} alt="" class="w-8 h-8 rounded-sm shrink-0" />
          <div class="flex-1 min-w-0">
            <div class="flex items-baseline gap-2">
              <span class="font-medium text-sm">{user.nickname}</span>
              <span class="text-xs text-neutral-500">{formatTime(m.createdAt)}</span>
            </div>
            <div class="mt-1">
              {#if m.type === 'text'}
                <p class="text-sm whitespace-pre-wrap">{m.body}</p>
              {:else if m.type === 'image'}
                <button
                  type="button"
                  onclick={() => openImage(m.body)}
                  class="block max-w-sm rounded overflow-hidden"
                >
                  <img src={m.body} alt="" class="w-full h-auto" />
                </button>
              {:else if m.type === 'video'}
                <video controls poster={m.thumbnailUrl} class="max-w-sm rounded">
                  <source src={m.body} type="video/mp4" />
                </video>
              {/if}
            </div>
          </div>
        </li>
      {/each}
    </ul>

    <footer class="p-3 border-t border-neutral-200 bg-white">
      <div class="flex gap-2">
        <textarea
          bind:value={input}
          onkeydown={handleKey}
          rows="2"
          placeholder="メッセージを入力 (Ctrl+Enter で送信)"
          class="flex-1 resize-none border border-neutral-300 rounded-sm p-2 text-sm focus:outline-none focus:border-[#1B4F8B]"
        ></textarea>
        <Button onclick={send} class="bg-[#1B4F8B] hover:bg-[#163D6D] self-end">送信</Button>
      </div>
    </footer>
  </div>

  <MediaViewer bind:open={viewerOpen} src={viewerSrc} />
{/if}
