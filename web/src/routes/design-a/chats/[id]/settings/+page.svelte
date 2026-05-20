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
		goto('/design-a/chats');
	}
</script>

{#if !chat}
	<div class="p-8">チャットが見つかりません</div>
{:else}
	<div class="mx-auto max-w-2xl p-6">
		<a
			href={`/design-a/chats/${chatId}`}
			class="mb-4 inline-flex items-center text-sm text-[#1B4F8B]"
		>
			<ChevronLeft class="h-4 w-4" /> チャットに戻る
		</a>
		<div class="rounded-sm border border-neutral-200 bg-white p-6">
			<div class="flex items-center gap-4 border-b border-neutral-100 pb-4">
				<img src={chat.iconUrl} alt="" class="h-14 w-14 rounded-sm" />
				<div>
					<h1 class="text-lg font-bold text-[#1B4F8B]">{chat.name}</h1>
					<p class="text-sm text-neutral-500">メンバー {chat.memberIds.length}名</p>
				</div>
			</div>

			<section class="border-b border-neutral-100 py-4">
				<h2 class="mb-3 text-sm font-bold">メンバー</h2>
				<ul class="space-y-2">
					{#each chat.memberIds as id (id)}
						{@const u = usersById[id]}
						<li class="flex items-center gap-3 text-sm">
							<img src={u.avatarUrl} alt="" class="h-7 w-7 rounded-sm" />
							<span>{u.nickname}</span>
						</li>
					{/each}
				</ul>
			</section>

			<section class="pt-4">
				<h2 class="mb-2 text-sm font-bold text-red-600">危険な操作</h2>
				<Button variant="destructive" onclick={() => (confirmOpen = true)}
					>このチャットから退会する</Button
				>
			</section>
		</div>
	</div>

	<AlertDialog.Root bind:open={confirmOpen}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>チャットから退会しますか？</AlertDialog.Title>
				<AlertDialog.Description>
					退会したチャットは「退会済み」一覧から再入会できます。
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>キャンセル</AlertDialog.Cancel>
				<AlertDialog.Action onclick={leave}>退会する</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}
