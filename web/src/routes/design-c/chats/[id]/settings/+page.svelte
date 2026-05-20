<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { chatStore } from '$lib/stores/chat-store.svelte';
  import { usersById } from '$lib/mock';
  import { Button } from '$lib/components/ui/button';
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import { ChevronLeft } from '@lucide/svelte';

  const chatId = $derived(page.params.id ?? '');
  const chat = $derived(chatStore.getChat(chatId));
  let confirmOpen = $state(false);

  function leave() {
    chatStore.leaveChat(chatId);
    confirmOpen = false;
    goto('/design-c/chats');
  }
</script>

{#if !chat}
  <div class="p-8">チャットが見つかりません</div>
{:else}
  <div class="min-h-screen">
    <header class="flex items-center px-4 py-3 bg-white shadow-sm sticky top-0">
      <a href={`/design-c/chats/${chatId}`} class="p-2 rounded-xl hover:bg-neutral-100" aria-label="戻る">
        <ChevronLeft class="w-6 h-6 text-[#FF8A65]" />
      </a>
      <h1 class="font-bold ml-2">チャット設定</h1>
    </header>

    <div class="max-w-2xl mx-auto p-4 space-y-4">
      <div class="bg-white rounded-3xl p-6 text-center">
        <img src={chat.iconUrl} alt="" class="w-20 h-20 rounded-3xl mx-auto mb-3" />
        <h2 class="text-xl font-bold">{chat.name}</h2>
        <p class="text-sm text-neutral-500 mt-1">{chat.memberIds.length}名のメンバー</p>
      </div>

      <section class="bg-white rounded-3xl p-6">
        <h2 class="font-bold mb-4">メンバー</h2>
        <ul class="space-y-3">
          {#each chat.memberIds as id (id)}
            {@const u = usersById[id]}
            <li class="flex items-center gap-3">
              <img src={u.avatarUrl} alt="" class="w-10 h-10 rounded-2xl" />
              <span>{u.nickname}</span>
            </li>
          {/each}
        </ul>
      </section>

      <section class="bg-white rounded-3xl p-6">
        <Button variant="destructive" class="w-full rounded-2xl h-12" onclick={() => (confirmOpen = true)}>
          このチャットから退会する
        </Button>
      </section>
    </div>
  </div>

  <AlertDialog.Root bind:open={confirmOpen}>
    <AlertDialog.Content class="rounded-3xl">
      <AlertDialog.Header>
        <AlertDialog.Title>退会しますか？</AlertDialog.Title>
        <AlertDialog.Description>退会したチャットは「退会したチャット」から再入会できます。</AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel class="rounded-2xl">キャンセル</AlertDialog.Cancel>
        <AlertDialog.Action class="rounded-2xl" onclick={leave}>退会する</AlertDialog.Action>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
{/if}
