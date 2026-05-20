<script lang="ts">
	let { children } = $props();

	const today = new Date();
	const issueDate = today.toLocaleDateString('ja-JP', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		weekday: 'long'
	});
	const issueNo = String(
		Math.floor((today.getTime() - new Date('2026-01-01').getTime()) / 86400000) + 1
	).padStart(4, '0');
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=JetBrains+Mono:wght@400;500;700&display=swap"
	/>
</svelte:head>

<div class="design-d min-h-screen" data-design="d">
	<div class="paper-bg min-h-screen">
		<div class="mx-auto max-w-7xl px-6 md:px-10">
			<!-- Masthead -->
			<header class="masthead">
				<div class="ear left">
					<span class="label">Vol. IV</span>
					<span class="label">No. {issueNo}</span>
				</div>
				<a href="/design-d/chats" class="title-block">
					<h1 class="title">Quarto</h1>
					<p class="kicker">— A DAILY CORRESPONDENCE —</p>
				</a>
				<div class="ear right">
					<span class="label">{issueDate}</span>
					<span class="label">第参刷</span>
				</div>
			</header>
			<div class="rule-double"></div>

			<main class="page-body">
				{@render children()}
			</main>

			<footer class="page-footer">
				<div class="rule-thin"></div>
				<div class="flex items-baseline justify-between pt-3 pb-6">
					<span class="label">© MMXXVI QUARTO PRESS</span>
					<a href="/" class="label link">← BACK TO DESIGNS</a>
					<span class="label">SET IN FRAUNCES &amp; NEWSREADER</span>
				</div>
			</footer>
		</div>
	</div>
</div>

<style>
	:global(.design-d) {
		--ink: #0e0e0e;
		--ink-soft: #2a2a28;
		--paper: #f5f1e8;
		--paper-2: #ebe4d2;
		--rule: rgba(14, 14, 14, 0.85);
		--rule-soft: rgba(14, 14, 14, 0.2);
		--accent: #c8312d;
		--muted: #8b8273;

		font-family: 'Newsreader', 'Hiragino Mincho ProN', 'YuMincho', 'MS PMincho', serif;
		color: var(--ink);
		font-feature-settings:
			'liga' 1,
			'kern' 1;
	}

	:global(.design-d *) {
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
	}

	.paper-bg {
		background-color: var(--paper);
		background-image:
			radial-gradient(circle at 25% 30%, rgba(200, 49, 45, 0.04), transparent 40%),
			radial-gradient(circle at 75% 80%, rgba(14, 14, 14, 0.04), transparent 40%),
			url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.05 0 0 0 0 0.05 0 0 0 0 0.05 0 0 0 0.18 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
		background-blend-mode: multiply, multiply, multiply;
	}

	.masthead {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: 1rem;
		padding: 2rem 0 1rem;
	}

	.title-block {
		display: block;
		text-align: center;
		text-decoration: none;
		color: var(--ink);
	}

	.title {
		font-family: 'Fraunces', 'YuMincho', serif;
		font-variation-settings:
			'opsz' 144,
			'wght' 800;
		font-style: italic;
		font-size: clamp(3rem, 8vw, 5.5rem);
		line-height: 0.9;
		letter-spacing: -0.04em;
		margin: 0;
	}

	.kicker {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		margin: 0.5rem 0 0;
		color: var(--ink-soft);
	}

	.ear {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.ear.left {
		align-items: flex-start;
	}
	.ear.right {
		align-items: flex-end;
	}

	.label {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--ink-soft);
	}

	.label.link {
		color: var(--ink);
		text-decoration: none;
	}
	.label.link:hover {
		color: var(--accent);
	}

	.rule-double {
		border-top: 1px solid var(--rule);
		border-bottom: 1px solid var(--rule);
		height: 4px;
		margin-bottom: 2rem;
	}

	.rule-thin {
		border-top: 1px solid var(--rule-soft);
		margin-top: 4rem;
	}

	.page-body {
		min-height: calc(100vh - 320px);
	}

	.page-footer {
		margin-top: 3rem;
	}
</style>
