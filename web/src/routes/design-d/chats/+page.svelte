<script lang="ts">
	import { chatStore } from '$lib/stores/chat-store.svelte';
	import { formatChatListTime } from '$lib/shared/format';

	const activeChats = $derived(chatStore.activeChats);
</script>

<section class="section-banner">
	<span class="sec-mark">CONTENTS / 目次</span>
	<h2 class="sec-title">本日の<span class="ital">書簡</span></h2>
	<p class="sec-deck">
		未読の手紙が <span class="count">{activeChats.reduce((s, c) => s + c.unreadCount, 0)}</span> 通、本日届いております。
	</p>
	<div class="banner-nav">
		<a class="banner-link" href="/design-d/archive">→ 退会した書簡集</a>
		<a class="banner-link" href="/design-d/settings/account">→ 編集者設定</a>
	</div>
</section>

<div class="rule-fancy"></div>

<ol class="contents-list">
	{#each activeChats as c, i (c.id)}
		<li class="entry">
			<a href={`/design-d/chats/${c.id}`} class="entry-link">
				<span class="entry-num">{String(i + 1).padStart(2, '0')}</span>
				<div class="entry-meta">
					<h3 class="entry-title">{c.name}</h3>
					<p class="entry-sub">
						寄稿者 {c.memberIds.length}名 · 最終便 {formatChatListTime(c.lastMessageAt)}
					</p>
				</div>
				<span class="leader" aria-hidden="true"></span>
				<span class="entry-page">
					{#if c.unreadCount > 0}
						<span class="unread">{c.unreadCount} 通</span>
					{:else}
						<span class="muted-mono">既読</span>
					{/if}
				</span>
			</a>
		</li>
	{/each}
</ol>

<style>
	.section-banner {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.5rem;
		text-align: center;
		padding: 1rem 0 1.5rem;
	}

	.sec-mark {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.35em;
		color: var(--muted);
	}

	.sec-title {
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 144,
			'wght' 700;
		font-size: clamp(2.5rem, 5.5vw, 4rem);
		margin: 0;
		line-height: 1;
		letter-spacing: -0.03em;
	}

	.ital {
		font-style: italic;
		color: var(--accent);
	}

	.sec-deck {
		font-family: 'Newsreader', serif;
		font-style: italic;
		font-size: 1.125rem;
		margin: 0.25rem 0 0;
	}

	.count {
		font-family: 'Fraunces', serif;
		font-weight: 700;
		color: var(--accent);
		font-size: 1.25rem;
	}

	.banner-nav {
		display: flex;
		gap: 2rem;
		justify-content: center;
		margin-top: 0.75rem;
	}

	.banner-link {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--ink);
		text-decoration: none;
		border-bottom: 1px solid var(--ink);
		padding-bottom: 2px;
	}

	.banner-link:hover {
		color: var(--accent);
		border-bottom-color: var(--accent);
	}

	.rule-fancy {
		margin: 1.5rem 0 2rem;
		height: 24px;
		background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 24'><line x1='0' y1='8' x2='120' y2='8' stroke='%230e0e0e' stroke-width='1'/><line x1='0' y1='12' x2='120' y2='12' stroke='%230e0e0e' stroke-width='2'/><line x1='0' y1='17' x2='120' y2='17' stroke='%230e0e0e' stroke-width='1'/><circle cx='60' cy='12' r='3' fill='%23C8312D'/></svg>");
		background-repeat: repeat-x;
		background-position: center;
	}

	.contents-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.entry {
		border-bottom: 1px dotted var(--rule);
	}

	.entry:first-child {
		border-top: 1px dotted var(--rule);
	}

	.entry-link {
		display: grid;
		grid-template-columns: 3rem 1fr auto auto;
		align-items: baseline;
		gap: 1rem;
		padding: 1.25rem 0.25rem;
		color: var(--ink);
		text-decoration: none;
		transition:
			background 0.15s ease,
			padding 0.15s ease;
	}

	.entry-link:hover {
		background: rgba(200, 49, 45, 0.05);
		padding-left: 1rem;
	}

	.entry-num {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.875rem;
		color: var(--accent);
		letter-spacing: 0.1em;
		align-self: center;
	}

	.entry-meta {
		min-width: 0;
	}

	.entry-title {
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 36,
			'wght' 600;
		font-size: 1.5rem;
		margin: 0;
		line-height: 1.15;
		letter-spacing: -0.01em;
	}

	.entry-sub {
		font-family: 'Newsreader', serif;
		font-size: 0.875rem;
		font-style: italic;
		color: var(--muted);
		margin: 0.25rem 0 0;
	}

	.leader {
		border-bottom: 1px dotted var(--rule);
		margin: 0 0.5rem 0.5rem;
		height: 1px;
	}

	.entry-page {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.8125rem;
		align-self: center;
	}

	.unread {
		display: inline-block;
		background: var(--accent);
		color: var(--paper);
		padding: 0.2rem 0.6rem;
		letter-spacing: 0.05em;
	}

	.muted-mono {
		color: var(--muted);
		letter-spacing: 0.1em;
	}
</style>
