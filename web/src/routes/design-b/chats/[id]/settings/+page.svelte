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
    goto('/design-b/chats');
  }
</script>

{#if !chat}
  <div class="p-8">チャットが見つかりません</div>
{:else}
  <div class="max-w-2xl mx-auto p-8">
    <a href={`/design-b/chats/${chatId}`} class="inline-flex items-center gap-1 text-sm text-[#7C3AED] mb-6 font-medium">
      <ChevronLeft class="w-4 h-4" /> 戻る
    </a>
    <div class="bg-white rounded-2xl shadow-sm p-8">
      <div class="flex items-center gap-4 pb-6 border-b border-neutral-100">
        <img src={chat.iconUrl} alt="" class="w-16 h-16 rounded-2xl" />
        <div>
          <h1 class="text-2xl font-bold">{chat.name}</h1>
          <p class="text-sm text-neutral-500 mt-1">{chat.memberIds.length}名のメンバー</p>
        </div>
      </div>

      <section class="py-6 border-b border-neutral-100">
        <h2 class="font-semibold mb-4">メンバー</h2>
        <ul class="space-y-3">
          {#each chat.memberIds as id (id)}
            {@const u = usersById[id]}
            <li class="flex items-center gap-3">
              <img src={u.avatarUrl} alt="" class="w-9 h-9 rounded-lg" />
              <span>{u.nickname}</span>
            </li>
          {/each}
        </ul>
      </section>

      <section class="pt-6">
        <h2 class="font-semibold text-red-600 mb-3">危険な操作</h2>
        <Button variant="destructive" class="rounded-xl" onclick={() => (confirmOpen = true)}>このチャットから退会する</Button>
      </section>
    </div>
  </div>

  <AlertDialog.Root bind:open={confirmOpen}>
    <AlertDialog.Content class="rounded-2xl">
      <AlertDialog.Header>
        <AlertDialog.Title>チャットから退会しますか？</AlertDialog.Title>
        <AlertDialog.Description>退会したチャットは「退会済み」一覧から再入会できます。</AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>キャンセル</AlertDialog.Cancel>
        <AlertDialog.Action onclick={leave}>退会する</AlertDialog.Action>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
{/if}
