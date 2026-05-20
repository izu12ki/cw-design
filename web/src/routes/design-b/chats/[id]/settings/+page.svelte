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
	<div class="mx-auto max-w-2xl p-8">
		<a
			href={`/design-b/chats/${chatId}`}
			class="mb-6 inline-flex items-center gap-1 text-sm font-medium text-[#7C3AED]"
		>
			<ChevronLeft class="h-4 w-4" /> 戻る
		</a>
		<div class="rounded-2xl bg-white p-8 shadow-sm">
			<div class="flex items-center gap-4 border-b border-neutral-100 pb-6">
				<img src={chat.iconUrl} alt="" class="h-16 w-16 rounded-2xl" />
				<div>
					<h1 class="text-2xl font-bold">{chat.name}</h1>
					<p class="mt-1 text-sm text-neutral-500">{chat.memberIds.length}名のメンバー</p>
				</div>
			</div>

			<section class="border-b border-neutral-100 py-6">
				<h2 class="mb-4 font-semibold">メンバー</h2>
				<ul class="space-y-3">
					{#each chat.memberIds as id (id)}
						{@const u = usersById[id]}
						<li class="flex items-center gap-3">
							<img src={u.avatarUrl} alt="" class="h-9 w-9 rounded-lg" />
							<span>{u.nickname}</span>
						</li>
					{/each}
				</ul>
			</section>

			<section class="pt-6">
				<h2 class="mb-3 font-semibold text-red-600">危険な操作</h2>
				<Button variant="destructive" class="rounded-xl" onclick={() => (confirmOpen = true)}
					>このチャットから退会する</Button
				>
			</section>
		</div>
	</div>

	<AlertDialog.Root bind:open={confirmOpen}>
		<AlertDialog.Content class="rounded-2xl">
			<AlertDialog.Header>
				<AlertDialog.Title>チャットから退会しますか？</AlertDialog.Title>
				<AlertDialog.Description
					>退会したチャットは「退会済み」一覧から再入会できます。</AlertDialog.Description
				>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>キャンセル</AlertDialog.Cancel>
				<AlertDialog.Action onclick={leave}>退会する</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}
