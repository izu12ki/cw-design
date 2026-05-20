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
	<div class="flex h-full items-center justify-center text-neutral-400">
		チャットが見つかりません
	</div>
{:else}
	<div class="flex h-screen flex-col">
		<header class="flex items-center justify-between border-b border-neutral-200 bg-white p-3">
			<div class="flex items-center gap-3">
				<img src={chat.iconUrl} alt="" class="h-9 w-9 rounded-sm" />
				<div>
					<h2 class="text-sm font-bold text-[#1B4F8B]">{chat.name}</h2>
					<p class="text-xs text-neutral-500">メンバー {chat.memberIds.length}名</p>
				</div>
			</div>
			<a
				href={`/design-a/chats/${chatId}/settings`}
				class="rounded p-2 hover:bg-neutral-100"
				aria-label="設定"
			>
				<Settings class="h-4 w-4 text-neutral-600" />
			</a>
		</header>

		<ul class="flex-1 space-y-3 overflow-y-auto bg-neutral-50 p-4">
			{#each messages as m (m.id)}
				{@const user = usersById[m.senderId]}
				<li class="flex gap-3">
					<img src={user.avatarUrl} alt="" class="h-8 w-8 shrink-0 rounded-sm" />
					<div class="min-w-0 flex-1">
						<div class="flex items-baseline gap-2">
							<span class="text-sm font-medium">{user.nickname}</span>
							<span class="text-xs text-neutral-500">{formatTime(m.createdAt)}</span>
						</div>
						<div class="mt-1">
							{#if m.type === 'text'}
								<p class="text-sm whitespace-pre-wrap">{m.body}</p>
							{:else if m.type === 'image'}
								<button
									type="button"
									onclick={() => openImage(m.body)}
									class="block max-w-sm overflow-hidden rounded"
								>
									<img src={m.body} alt="" class="h-auto w-full" />
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

		<footer class="border-t border-neutral-200 bg-white p-3">
			<div class="flex gap-2">
				<textarea
					bind:value={input}
					onkeydown={handleKey}
					rows="2"
					placeholder="メッセージを入力 (Ctrl+Enter で送信)"
					class="flex-1 resize-none rounded-sm border border-neutral-300 p-2 text-sm focus:border-[#1B4F8B] focus:outline-none"
				></textarea>
				<Button onclick={send} class="self-end bg-[#1B4F8B] hover:bg-[#163D6D]">送信</Button>
			</div>
		</footer>
	</div>

	<MediaViewer bind:open={viewerOpen} src={viewerSrc} />
{/if}
