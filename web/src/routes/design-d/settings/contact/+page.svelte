<script lang="ts">
	let subject = $state('');
	let body = $state('');

	function submit(e: Event) {
		e.preventDefault();
		alert('投書を受領いたしました（モック）');
		subject = '';
		body = '';
	}
</script>

<article class="article">
	<header class="art-head">
		<span class="art-num">LETTERS TO THE EDITOR</span>
		<h1 class="art-title">投書欄</h1>
	</header>

	<blockquote class="pull-quote">
		<p>「読者の声は、本紙の血液である。」</p>
		<cite>— 創刊者の言葉</cite>
	</blockquote>

	<form onsubmit={submit} class="contact-form">
		<div class="field-block">
			<label for="subject" class="block-label">件名</label>
			<input
				id="subject"
				bind:value={subject}
				required
				class="block-input"
				placeholder="お問い合わせの主旨をご記入ください"
			/>
		</div>

		<div class="field-block">
			<label for="body" class="block-label">本文</label>
			<textarea
				id="body"
				bind:value={body}
				required
				rows="10"
				class="block-textarea"
				placeholder="ご自由にお書きください……"
			></textarea>
		</div>

		<div class="form-foot">
			<p class="form-note">※ 編集部より3営業日以内にご返信申し上げます。</p>
			<button type="submit" class="post-btn">投書を送る ↦</button>
		</div>
	</form>
</article>

<style>
	.article {
		max-width: 50rem;
	}

	.art-head {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		margin-bottom: 2rem;
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

	.pull-quote {
		border-left: 4px solid var(--accent);
		padding: 0 0 0 2rem;
		margin: 0 0 2.5rem;
	}

	.pull-quote p {
		font-family: 'Fraunces', serif;
		font-style: italic;
		font-size: 1.75rem;
		line-height: 1.3;
		margin: 0 0 0.5rem;
		letter-spacing: -0.01em;
	}

	.pull-quote cite {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		letter-spacing: 0.2em;
		color: var(--muted);
		font-style: normal;
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.field-block {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.block-label {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: var(--ink);
		padding-bottom: 0.5rem;
		border-bottom: 1px solid var(--ink);
	}

	.block-input,
	.block-textarea {
		background: var(--paper-2);
		border: 1px solid var(--ink);
		padding: 1rem 1.25rem;
		font-family: 'Newsreader', serif;
		font-size: 1.0625rem;
		line-height: 1.6;
		color: var(--ink);
		outline: none;
	}

	.block-input:focus,
	.block-textarea:focus {
		border-color: var(--accent);
	}

	.block-textarea {
		resize: vertical;
		min-height: 12rem;
	}

	.block-input::placeholder,
	.block-textarea::placeholder {
		font-style: italic;
		color: var(--muted);
	}

	.form-foot {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.form-note {
		font-family: 'Newsreader', serif;
		font-style: italic;
		font-size: 0.875rem;
		color: var(--muted);
		margin: 0;
	}

	.post-btn {
		background: var(--accent);
		color: var(--paper);
		border: 1px solid var(--accent);
		padding: 0.85rem 1.75rem;
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 144,
			'wght' 600;
		font-size: 1.0625rem;
		cursor: pointer;
		transition: all 0.18s ease;
	}

	.post-btn:hover {
		background: var(--ink);
		border-color: var(--ink);
		transform: translate(-2px, -2px);
		box-shadow: 4px 4px 0 var(--accent);
	}
</style>
