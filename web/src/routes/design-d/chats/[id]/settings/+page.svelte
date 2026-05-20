<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { chatStore } from '$lib/stores/chat-store.svelte';
	import { usersById } from '$lib/mock';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	const chatId = $derived(page.params.id ?? '');
	const chat = $derived(chatStore.getChat(chatId));
	let confirmOpen = $state(false);

	function leave() {
		chatStore.leaveChat(chatId);
		confirmOpen = false;
		goto('/design-d/chats');
	}
</script>

{#if !chat}
	<p class="muted">書簡が見つかりません</p>
{:else}
	<article class="settings">
		<header class="set-head">
			<a href={`/design-d/chats/${chatId}`} class="crumb">← 書簡へ戻る</a>
			<div class="set-titleblock">
				<p class="set-mark">— DETAILS / 巻号情報 —</p>
				<h1 class="set-title">{chat.name}</h1>
			</div>
			<span></span>
		</header>

		<div class="rule-double-d"></div>

		<section class="members">
			<h2 class="section-h">
				<span class="ord">I.</span> 寄稿者名簿
			</h2>
			<ul class="member-list">
				{#each chat.memberIds as id (id)}
					{@const u = usersById[id]}
					<li class="member">
						<span class="m-rule"></span>
						<span class="m-name">{u.nickname}</span>
						<span class="m-meta">— {u.email}</span>
					</li>
				{/each}
			</ul>
		</section>

		<section class="danger">
			<h2 class="section-h">
				<span class="ord danger-ord">II.</span> 寄稿の取り下げ
			</h2>
			<p class="danger-text">
				本書簡集からのご退場をご希望の場合、以下より手続き願います。<br />
				再入会は <em>退会した書簡集</em> よりいつでも可能です。
			</p>
			<button type="button" class="danger-btn" onclick={() => (confirmOpen = true)}>
				この書簡から退会する →
			</button>
		</section>
	</article>

	<AlertDialog.Root bind:open={confirmOpen}>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>本書簡から退会いたしますか？</AlertDialog.Title>
				<AlertDialog.Description
					>退会後も「退会した書簡集」より再入会可能です。</AlertDialog.Description
				>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>取り消し</AlertDialog.Cancel>
				<AlertDialog.Action onclick={leave}>退会する</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
{/if}

<style>
	.muted {
		font-family: 'Newsreader', serif;
		font-style: italic;
		color: var(--muted);
		text-align: center;
		padding: 4rem 0;
	}

	.settings {
		padding: 0.5rem 0 2rem;
	}

	.set-head {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: baseline;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.crumb {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.25em;
		color: var(--ink);
		text-decoration: none;
		justify-self: start;
	}

	.crumb:hover {
		color: var(--accent);
	}

	.set-titleblock {
		text-align: center;
	}

	.set-mark {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.3em;
		color: var(--muted);
		margin: 0 0 0.5rem;
	}

	.set-title {
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 144,
			'wght' 700;
		font-style: italic;
		font-size: clamp(2rem, 4.5vw, 3rem);
		line-height: 1;
		margin: 0;
		letter-spacing: -0.02em;
	}

	.rule-double-d {
		border-top: 3px double var(--rule);
		margin: 1rem 0 3rem;
	}

	.section-h {
		font-family: 'Fraunces', serif;
		font-size: 1.5rem;
		font-variation-settings:
			'opsz' 36,
			'wght' 600;
		display: flex;
		align-items: baseline;
		gap: 1rem;
		margin: 0 0 1.5rem;
	}

	.ord {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.875rem;
		color: var(--accent);
		letter-spacing: 0.1em;
	}

	.members {
		margin-bottom: 4rem;
	}

	.member-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.member {
		display: grid;
		grid-template-columns: 3rem 1fr auto;
		align-items: baseline;
		gap: 1rem;
		padding: 0.85rem 0;
		border-bottom: 1px dotted var(--rule);
	}

	.m-rule {
		display: block;
		height: 1px;
		background: var(--ink);
	}

	.m-name {
		font-family: 'Fraunces', serif;
		font-size: 1.125rem;
	}

	.m-meta {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.8125rem;
		color: var(--muted);
	}

	.danger {
		background: rgba(200, 49, 45, 0.05);
		border: 1px solid var(--accent);
		padding: 2rem;
	}

	.danger-ord {
		color: var(--accent);
	}

	.danger-text {
		font-family: 'Newsreader', serif;
		font-size: 1.0625rem;
		line-height: 1.6;
		margin: 0 0 1.5rem;
	}

	.danger-text em {
		font-style: italic;
		color: var(--accent);
	}

	.danger-btn {
		background: var(--accent);
		color: var(--paper);
		border: 1px solid var(--accent);
		padding: 0.85rem 1.75rem;
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 144,
			'wght' 600;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.18s ease;
	}

	.danger-btn:hover {
		background: var(--ink);
		border-color: var(--ink);
		transform: translate(-2px, -2px);
		box-shadow: 4px 4px 0 var(--accent);
	}
</style>
