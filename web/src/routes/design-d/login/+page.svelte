<script lang="ts">
	import { goto } from '$app/navigation';

	let email = $state('');
	let password = $state('');

	function submit(e: Event) {
		e.preventDefault();
		alert('ログインしました（モック）');
		goto('/design-d/chats');
	}
</script>

<div class="grid items-start gap-12 py-8 md:grid-cols-[1.1fr_1fr]">
	<aside class="editorial">
		<p class="dropcap-section">EDITORIAL</p>
		<h2 class="lede">
			<span class="emphasis">読者の皆様、</span><br />
			本紙の続きを<br />お読みになるには<br />
			<span class="emphasis">署名が必要です。</span>
		</h2>
		<div class="byline">
			<p class="byline-text">
				我々は、日々の手紙を編み、皆様の元へ届けます。続きは登録した会員のみに開かれます。
			</p>
			<p class="signature">— 編集部</p>
		</div>
	</aside>

	<form onsubmit={submit} class="entry-form">
		<header class="form-head">
			<span class="form-section">Sec. A · Sign-In</span>
			<h1 class="form-title">入場券</h1>
		</header>
		<div class="rule-thick"></div>

		<div class="field">
			<label for="email" class="field-label">電子郵便<span class="field-num">i.</span></label>
			<input id="email" type="email" bind:value={email} required class="field-input" />
		</div>

		<div class="field">
			<label for="password" class="field-label">合言葉<span class="field-num">ii.</span></label>
			<input id="password" type="password" bind:value={password} required class="field-input" />
		</div>

		<button type="submit" class="press-btn">
			<span class="btn-mark">▶</span> 入場する
		</button>

		<p class="form-footnote">
			※ お持ちでない方は <a href="/design-d/signup">こちらより新規登録</a>。
		</p>
	</form>
</div>

<style>
	.editorial {
		padding-top: 0.5rem;
	}

	.dropcap-section {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.35em;
		color: var(--accent);
		margin: 0 0 1rem;
	}

	.lede {
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 144,
			'wght' 350;
		font-size: clamp(2rem, 4.2vw, 3.5rem);
		line-height: 1.1;
		letter-spacing: -0.02em;
		margin: 0 0 2rem;
	}

	.emphasis {
		font-style: italic;
		font-variation-settings:
			'opsz' 144,
			'wght' 600;
		color: var(--accent);
	}

	.byline {
		max-width: 28rem;
		border-left: 2px solid var(--ink);
		padding-left: 1.5rem;
	}

	.byline-text {
		font-family: 'Newsreader', serif;
		font-size: 1.0625rem;
		line-height: 1.6;
		margin: 0 0 1rem;
	}

	.signature {
		font-family: 'Fraunces', serif;
		font-style: italic;
		font-size: 0.95rem;
		margin: 0;
		color: var(--muted);
	}

	.entry-form {
		background: var(--paper-2);
		border: 1px solid var(--rule);
		padding: 2.25rem;
		box-shadow: 6px 6px 0 var(--ink);
	}

	.form-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.form-section {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: var(--muted);
	}

	.form-title {
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 144,
			'wght' 700;
		font-size: 2rem;
		margin: 0;
		letter-spacing: -0.02em;
	}

	.rule-thick {
		height: 6px;
		background:
			linear-gradient(to bottom, var(--ink), var(--ink)) top/100% 1px no-repeat,
			linear-gradient(to bottom, var(--ink), var(--ink)) bottom/100% 3px no-repeat;
		margin: 1rem 0 1.5rem;
	}

	.field {
		display: grid;
		grid-template-columns: 9rem 1fr;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem 0;
		border-bottom: 1px dotted var(--rule);
	}

	.field-label {
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 14,
			'wght' 500;
		font-size: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding-right: 0.5rem;
	}

	.field-num {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		color: var(--muted);
		letter-spacing: 0.1em;
	}

	.field-input {
		background: transparent;
		border: none;
		outline: none;
		font-family: 'JetBrains Mono', monospace;
		font-size: 1rem;
		color: var(--ink);
		padding: 0.5rem 0;
		width: 100%;
		border-bottom: 1px solid transparent;
	}

	.field-input:focus {
		border-bottom-color: var(--accent);
	}

	.press-btn {
		margin-top: 2rem;
		width: 100%;
		background: var(--ink);
		color: var(--paper);
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 144,
			'wght' 600;
		font-size: 1.125rem;
		padding: 0.95rem 1.25rem;
		border: 1px solid var(--ink);
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		transition: all 0.18s ease;
	}

	.press-btn:hover {
		background: var(--accent);
		border-color: var(--accent);
		transform: translate(-2px, -2px);
		box-shadow: 4px 4px 0 var(--ink);
	}

	.btn-mark {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.8rem;
	}

	.form-footnote {
		font-family: 'Newsreader', serif;
		font-size: 0.875rem;
		font-style: italic;
		color: var(--muted);
		margin: 1.25rem 0 0;
	}

	.form-footnote a {
		color: var(--accent);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
