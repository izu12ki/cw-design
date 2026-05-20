<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();

	const items = [
		{ href: '/design-d/settings/account', label: '編集者', sub: 'EDITOR' },
		{ href: '/design-d/settings/contact', label: '投書欄', sub: 'CONTACT' },
		{ href: '/design-d/settings/terms', label: '社則', sub: 'TERMS' },
		{ href: '/design-d/settings/faq', label: 'よくある問', sub: 'FAQ' },
		{ href: '/design-d/settings/privacy', label: '個人情報', sub: 'PRIVACY' },
		{ href: '/design-d/settings/delete', label: '廃刊届', sub: 'DELETE' }
	];
</script>

<div class="settings-page py-4">
	<header class="set-banner">
		<span class="sec-mark">SETTINGS / 編集者控室</span>
		<h2 class="sec-title">控室の<span class="ital">扉</span></h2>
	</header>

	<div class="rule-double-d"></div>

	<div class="layout">
		<nav class="side-index">
			<p class="index-mark">INDEX</p>
			<ul>
				{#each items as it, i (it.href)}
					{@const active = page.url.pathname === it.href}
					<li class:active>
						<a href={it.href}>
							<span class="i-num">{String(i + 1).padStart(2, '0')}</span>
							<span class="i-label">{it.label}</span>
							<span class="i-sub">{it.sub}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<section class="content">
			{@render children()}
		</section>
	</div>
</div>

<style>
	.set-banner {
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

	.rule-double-d {
		border-top: 3px double var(--rule);
		margin: 1.5rem 0 2.5rem;
	}

	.layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: 3rem;
	}

	@media (min-width: 880px) {
		.layout {
			grid-template-columns: 18rem 1fr;
		}
	}

	.side-index {
		position: sticky;
		top: 1rem;
		align-self: start;
	}

	.index-mark {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.3em;
		color: var(--accent);
		margin: 0 0 0.75rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--ink);
	}

	.side-index ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.side-index li {
		border-bottom: 1px dotted var(--rule);
	}

	.side-index a {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 0.75rem;
		align-items: baseline;
		padding: 0.85rem 0.25rem;
		color: var(--ink);
		text-decoration: none;
		transition:
			padding 0.18s ease,
			background 0.15s ease;
	}

	.side-index a:hover {
		padding-left: 0.75rem;
		background: rgba(200, 49, 45, 0.06);
	}

	.side-index li.active a {
		background: var(--ink);
		color: var(--paper);
		padding-left: 0.75rem;
	}

	.side-index li.active a .i-num,
	.side-index li.active a .i-sub {
		color: var(--paper);
		opacity: 0.8;
	}

	.i-num {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		color: var(--accent);
		letter-spacing: 0.1em;
	}

	.i-label {
		font-family: 'Fraunces', serif;
		font-size: 1.0625rem;
		font-variation-settings:
			'opsz' 24,
			'wght' 500;
	}

	.i-sub {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.625rem;
		letter-spacing: 0.2em;
		color: var(--muted);
	}
</style>
