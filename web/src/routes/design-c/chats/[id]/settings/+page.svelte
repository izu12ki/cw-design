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
		<header class="sticky top-0 flex items-center bg-white px-4 py-3 shadow-sm">
			<a
				href={`/design-c/chats/${chatId}`}
				class="rounded-xl p-2 hover:bg-neutral-100"
				aria-label="戻る"
			>
				<ChevronLeft class="h-6 w-6 text-[#FF8A65]" />
			</a>
			<h1 class="ml-2 font-bold">チャット設定</h1>
		</header>

		<div class="mx-auto max-w-2xl space-y-4 p-4">
			<div class="rounded-3xl bg-white p-6 text-center">
				<img src={chat.iconUrl} alt="" class="mx-auto mb-3 h-20 w-20 rounded-3xl" />
				<h2 class="text-xl font-bold">{chat.name}</h2>
				<p class="mt-1 text-sm text-neutral-500">{chat.memberIds.length}名のメンバー</p>
			</div>

			<section class="rounded-3xl bg-white p-6">
				<h2 class="mb-4 font-bold">メンバー</h2>
				<ul class="space-y-3">
					{#each chat.memberIds as id (id)}
						{@const u = usersById[id]}
						<li class="flex items-center gap-3">
							<img src={u.avatarUrl} alt="" class="h-10 w-10 rounded-2xl" />
							<span>{u.nickname}</span>
						</li>
					{/each}
				</ul>
			</section>

			<section class="rounded-3xl bg-white p-6">
				<Button
					variant="destructive"
					class="h-12 w-full rounded-2xl"
					onclick={() => (confirmOpen = true)}
				>
					このチャットから退会する
				</Button>
			</section>
		</div>
	</div>

	<AlertDialog.Root bind:open={confirmOpen}>
		<AlertDialog.Content class="rounded-3xl">
			<AlertDialog.Header>
				<AlertDialog.Title>退会しますか？</AlertDialog.Title>
				<AlertDialog.Description
					>退会したチャットは「退会したチャット」から再入会できます。</AlertDialog.Description
				>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel class="rounded-2xl">キャンセル</AlertDialog.Cancel>
				<AlertDialog.Action class="rounded-2xl" onclick={leave}>退会する</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}
