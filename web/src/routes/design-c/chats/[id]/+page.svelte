<script lang="ts">
  import { page } from '$app/state';
  import { chatStore } from '$lib/stores/chat-store.svelte';
  import { usersById, CURRENT_USER_ID } from '$lib/mock';
  import { formatTime } from '$lib/shared/format';
  import { Button } from '$lib/components/ui/button';
  import MediaViewer from '$lib/shared/MediaViewer.svelte';
  import { ChevronLeft, Settings } from '@lucide/svelte';

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
  <div class="min-h-screen flex items-center justify-center text-neutral-400">チャットが見つかりません</div>
{:else}
  <div class="flex flex-col h-screen">
    <header class="flex items-center justify-between px-4 py-3 bg-white shadow-sm sticky top-0">
      <a href="/design-c/chats" class="p-2 rounded-xl hover:bg-neutral-100" aria-label="戻る">
        <ChevronLeft class="w-6 h-6 text-[#FF8A65]" />
      </a>
      <div class="flex items-center gap-2">
        <img src={chat.iconUrl} alt="" class="w-9 h-9 rounded-xl" />
        <div class="text-center">
          <h2 class="font-bold leading-tight">{chat.name}</h2>
          <p class="text-xs text-neutral-500">{chat.memberIds.length}名</p>
        </div>
      </div>
      <a href={`/design-c/chats/${chatId}/settings`} class="p-2 rounded-xl hover:bg-neutral-100" aria-label="設定">
        <Settings class="w-6 h-6 text-neutral-500" />
      </a>
    </header>

    <ul class="flex-1 overflow-y-auto px-4 py-6 space-y-3 max-w-2xl w-full mx-auto">
      {#each messages as m (m.id)}
        {@const user = usersById[m.senderId]}
        {@const isMine = m.senderId === CURRENT_USER_ID}
        <li class="flex {isMine ? 'justify-end' : 'justify-start'} gap-2">
          {#if !isMine}
            <img src={user.avatarUrl} alt="" class="w-9 h-9 rounded-xl shrink-0 self-end" />
          {/if}
          <div class="max-w-[75%] {isMine ? 'items-end' : 'items-start'} flex flex-col">
            {#if !isMine}
              <span class="text-xs text-neutral-500 mb-1 px-2">{user.nickname}</span>
            {/if}
            <div class="rounded-3xl px-4 py-3 shadow-sm {isMine ? 'bg-[#FF8A65] text-white rounded-br-md' : 'bg-white rounded-bl-md'}">
              {#if m.type === 'text'}
                <p class="whitespace-pre-wrap text-[15px]">{m.body}</p>
              {:else if m.type === 'image'}
                <button type="button" onclick={() => openImage(m.body)} class="block rounded-2xl overflow-hidden -m-1">
                  <img src={m.body} alt="" class="w-full max-w-xs h-auto" />
                </button>
              {:else if m.type === 'video'}
                <video controls poster={m.thumbnailUrl} class="rounded-2xl max-w-xs">
                  <source src={m.body} type="video/mp4" />
                </video>
              {/if}
            </div>
            <span class="text-[10px] text-neutral-400 mt-1 px-2">{formatTime(m.createdAt)}</span>
          </div>
        </li>
      {/each}
    </ul>

    <footer class="px-3 py-3 bg-white border-t border-neutral-200">
      <div class="flex gap-2 items-end max-w-2xl mx-auto">
        <textarea
          bind:value={input}
          onkeydown={handleKey}
          rows="1"
          placeholder="メッセージを入力..."
          class="flex-1 resize-none border border-neutral-200 bg-[#FFF8F3] rounded-2xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#FF8A65]"
        ></textarea>
        <Button onclick={send} class="bg-[#FF8A65] hover:bg-[#F4733E] rounded-2xl h-12 px-6">送信</Button>
      </div>
    </footer>
  </div>

  <MediaViewer bind:open={viewerOpen} src={viewerSrc} />
{/if}
