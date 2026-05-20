<script lang="ts">
	const qa = [
		{
			q: 'チャットから退会するには？',
			a: '書簡（チャット）画面右上の「SETTINGS」をお選びいただき、「この書簡から退会する」をご利用ください。'
		},
		{
			q: '退会した書簡集に戻りたい',
			a: 'メニュー →「退会した書簡集」へお進みのうえ、「再入会する」をお押しください。'
		},
		{
			q: '通知が届きません',
			a: '編集者設定 → 通知（電報）を有効化し、ブラウザの権限設定もあわせてご確認ください。'
		},
		{ q: '本紙から退会したい', a: '設定 →「廃刊届」より、退会の手続きをお進めいただけます。' }
	];
</script>

<article class="article">
	<header class="art-head">
		<span class="art-num">FAQ · よくある問</span>
		<h1 class="art-title">読者の疑問</h1>
	</header>

	<p class="lede">編集部に寄せられた、よくあるお問い合わせをこちらにまとめました。</p>

	<div class="rule-thin"></div>

	<dl class="qa">
		{#each qa as item, i (i)}
			<details class="qa-item">
				<summary class="qa-q">
					<span class="q-num">問 {String(i + 1).padStart(2, '0')}</span>
					<span class="q-text">{item.q}</span>
					<span class="q-mark">＋</span>
				</summary>
				<div class="qa-a">
					<span class="a-key">— 答 —</span>
					<p>{item.a}</p>
				</div>
			</details>
		{/each}
	</dl>
</article>

<style>
	.article {
		max-width: 50rem;
	}

	.art-head {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.art-num {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.3em;
		color: var(--accent);
	}

	.art-title {
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 72,
			'wght' 700;
		font-size: 2rem;
		font-style: italic;
		margin: 0;
		letter-spacing: -0.02em;
	}

	.lede {
		font-family: 'Newsreader', serif;
		font-style: italic;
		font-size: 1.125rem;
		margin: 0 0 1.5rem;
		color: var(--ink-soft);
	}

	.rule-thin {
		border-top: 1px solid var(--ink);
		margin-bottom: 0;
	}

	.qa {
		margin: 0;
	}

	.qa-item {
		border-bottom: 1px solid var(--ink);
	}

	.qa-q {
		list-style: none;
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 1rem;
		align-items: baseline;
		padding: 1.25rem 0.25rem;
		cursor: pointer;
		transition:
			background 0.15s ease,
			padding 0.15s ease;
	}

	.qa-q::-webkit-details-marker {
		display: none;
	}

	.qa-q:hover {
		background: rgba(200, 49, 45, 0.05);
		padding-left: 0.75rem;
	}

	.q-num {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		letter-spacing: 0.15em;
		color: var(--accent);
	}

	.q-text {
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 24,
			'wght' 600;
		font-size: 1.125rem;
		letter-spacing: -0.005em;
	}

	.q-mark {
		font-family: 'Fraunces', serif;
		font-size: 1.25rem;
		color: var(--accent);
		transition: transform 0.18s ease;
	}

	.qa-item[open] .q-mark {
		transform: rotate(45deg);
	}

	.qa-a {
		padding: 0 0.25rem 1.5rem 4.5rem;
	}

	.a-key {
		display: inline-block;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.25em;
		color: var(--accent);
		margin-bottom: 0.5rem;
	}

	.qa-a p {
		font-family: 'Newsreader', serif;
		font-size: 1.0625rem;
		line-height: 1.7;
		margin: 0;
	}
</style>
