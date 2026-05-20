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
	<div class="flex min-h-screen items-center justify-center text-neutral-400">
		チャットが見つかりません
	</div>
{:else}
	<div class="flex h-screen flex-col">
		<header class="sticky top-0 flex items-center justify-between bg-white px-4 py-3 shadow-sm">
			<a href="/design-c/chats" class="rounded-xl p-2 hover:bg-neutral-100" aria-label="戻る">
				<ChevronLeft class="h-6 w-6 text-[#FF8A65]" />
			</a>
			<div class="flex items-center gap-2">
				<img src={chat.iconUrl} alt="" class="h-9 w-9 rounded-xl" />
				<div class="text-center">
					<h2 class="leading-tight font-bold">{chat.name}</h2>
					<p class="text-xs text-neutral-500">{chat.memberIds.length}名</p>
				</div>
			</div>
			<a
				href={`/design-c/chats/${chatId}/settings`}
				class="rounded-xl p-2 hover:bg-neutral-100"
				aria-label="設定"
			>
				<Settings class="h-6 w-6 text-neutral-500" />
			</a>
		</header>

		<ul class="mx-auto w-full max-w-2xl flex-1 space-y-3 overflow-y-auto px-4 py-6">
			{#each messages as m (m.id)}
				{@const user = usersById[m.senderId]}
				{@const isMine = m.senderId === CURRENT_USER_ID}
				<li class="flex {isMine ? 'justify-end' : 'justify-start'} gap-2">
					{#if !isMine}
						<img src={user.avatarUrl} alt="" class="h-9 w-9 shrink-0 self-end rounded-xl" />
					{/if}
					<div class="max-w-[75%] {isMine ? 'items-end' : 'items-start'} flex flex-col">
						{#if !isMine}
							<span class="mb-1 px-2 text-xs text-neutral-500">{user.nickname}</span>
						{/if}
						<div
							class="rounded-3xl px-4 py-3 shadow-sm {isMine
								? 'rounded-br-md bg-[#FF8A65] text-white'
								: 'rounded-bl-md bg-white'}"
						>
							{#if m.type === 'text'}
								<p class="text-[15px] whitespace-pre-wrap">{m.body}</p>
							{:else if m.type === 'image'}
								<button
									type="button"
									onclick={() => openImage(m.body)}
									class="-m-1 block overflow-hidden rounded-2xl"
								>
									<img src={m.body} alt="" class="h-auto w-full max-w-xs" />
								</button>
							{:else if m.type === 'video'}
								<video controls poster={m.thumbnailUrl} class="max-w-xs rounded-2xl">
									<source src={m.body} type="video/mp4" />
								</video>
							{/if}
						</div>
						<span class="mt-1 px-2 text-[10px] text-neutral-400">{formatTime(m.createdAt)}</span>
					</div>
				</li>
			{/each}
		</ul>

		<footer class="border-t border-neutral-200 bg-white px-3 py-3">
			<div class="mx-auto flex max-w-2xl items-end gap-2">
				<textarea
					bind:value={input}
					onkeydown={handleKey}
					rows="1"
					placeholder="メッセージを入力..."
					class="flex-1 resize-none rounded-2xl border border-neutral-200 bg-[#FFF8F3] px-4 py-3 text-[15px] focus:border-[#FF8A65] focus:outline-none"
				></textarea>
				<Button onclick={send} class="h-12 rounded-2xl bg-[#FF8A65] px-6 hover:bg-[#F4733E]"
					>送信</Button
				>
			</div>
		</footer>
	</div>

	<MediaViewer bind:open={viewerOpen} src={viewerSrc} />
{/if}
