<script lang="ts">
	import { chatStore } from '$lib/stores/chat-store.svelte';

	const archived = $derived(chatStore.archivedChats);
</script>

<section class="archive-head">
	<span class="sec-mark">ARCHIVE / 退会済み</span>
	<h2 class="sec-title">退会した<span class="ital">書簡集</span></h2>
	<p class="deck">廃巻となった書簡をご覧いただけます。再入会も可能です。</p>
</section>

<div class="rule-double-d"></div>

{#if archived.length === 0}
	<p class="empty">廃巻となった書簡はございません。</p>
{:else}
	<div class="grid">
		{#each archived as c, i (c.id)}
			<article class="card">
				<header class="card-head">
					<span class="card-num">No. {String(i + 1).padStart(2, '0')}</span>
					<span class="card-stamp">廃 巻</span>
				</header>
				<h3 class="card-title">{c.name}</h3>
				<p class="card-meta">寄稿者 {c.memberIds.length}名 · 最終号</p>
				<div class="rule-thin"></div>
				<button type="button" class="rejoin" onclick={() => chatStore.rejoinChat(c.id)}>
					再入会する <span class="arrow">↪</span>
				</button>
			</article>
		{/each}
	</div>
{/if}

<style>
	.archive-head {
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
		font-size: clamp(2.5rem, 5vw, 3.75rem);
		margin: 0.25rem 0;
		letter-spacing: -0.03em;
		line-height: 1;
	}

	.ital {
		font-style: italic;
		color: var(--accent);
	}

	.deck {
		font-family: 'Newsreader', serif;
		font-style: italic;
		font-size: 1.0625rem;
		margin: 0.5rem 0 0;
		color: var(--ink-soft);
	}

	.rule-double-d {
		border-top: 3px double var(--rule);
		margin: 1.5rem 0 2.5rem;
	}

	.empty {
		text-align: center;
		font-family: 'Newsreader', serif;
		font-style: italic;
		color: var(--muted);
		padding: 4rem 0;
	}

	.grid {
		display: grid;
		gap: 1.5rem;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
	}

	.card {
		background: var(--paper-2);
		border: 1px solid var(--ink);
		padding: 1.5rem;
		box-shadow: 4px 4px 0 var(--ink);
		transition:
			transform 0.18s ease,
			box-shadow 0.18s ease;
		display: flex;
		flex-direction: column;
	}

	.card:hover {
		transform: translate(-2px, -2px);
		box-shadow: 6px 6px 0 var(--accent);
	}

	.card-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.card-num {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.2em;
		color: var(--accent);
	}

	.card-stamp {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.4em;
		color: var(--paper);
		background: var(--ink);
		padding: 0.2rem 0.6rem;
	}

	.card-title {
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 36,
			'wght' 600;
		font-size: 1.5rem;
		font-style: italic;
		margin: 1rem 0 0.25rem;
		letter-spacing: -0.01em;
	}

	.card-meta {
		font-family: 'Newsreader', serif;
		font-size: 0.875rem;
		font-style: italic;
		color: var(--muted);
		margin: 0;
	}

	.rule-thin {
		border-top: 1px dotted var(--rule);
		margin: 1rem 0;
	}

	.rejoin {
		background: transparent;
		color: var(--ink);
		border: 1px solid var(--ink);
		padding: 0.6rem 1rem;
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 144,
			'wght' 500;
		font-size: 0.95rem;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		justify-content: center;
		transition: all 0.18s ease;
		margin-top: auto;
	}

	.rejoin:hover {
		background: var(--ink);
		color: var(--paper);
	}

	.arrow {
		font-family: 'JetBrains Mono', monospace;
	}
</style>
