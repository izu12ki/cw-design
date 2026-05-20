<script lang="ts">
	import { goto } from '$app/navigation';

	let nickname = $state('');
	let birthDate = $state('');
	let email = $state('');
	let password = $state('');

	function submit(e: Event) {
		e.preventDefault();
		alert('登録しました（モック）');
		goto('/design-d/chats');
	}
</script>

<div class="py-8">
	<header class="entry-banner">
		<span class="section-mark">SEC. B</span>
		<h1 class="entry-title">新規<span class="italic">寄稿者</span>登録</h1>
		<p class="lede">本紙にて手紙のやり取りを始められる、新しい読者の方々を心より歓迎いたします。</p>
	</header>

	<div class="rule-double-d"></div>

	<form onsubmit={submit} class="register-grid">
		<aside class="instructions">
			<p class="annot">記入要領</p>
			<ol class="rules">
				<li>すべての項目に正確にご記入ください。</li>
				<li>合言葉は他人と共有なさらぬよう。</li>
				<li>登録後、即座に書簡集をご利用いただけます。</li>
			</ol>
		</aside>

		<div class="form-stack">
			<div class="form-row">
				<label for="nickname" class="row-label">
					<span class="num">01</span>
					<span class="row-name">筆名（ニックネーム）</span>
				</label>
				<input id="nickname" bind:value={nickname} required class="row-input" placeholder="——" />
			</div>

			<div class="form-row">
				<label for="birthDate" class="row-label">
					<span class="num">02</span>
					<span class="row-name">生年月日</span>
				</label>
				<input id="birthDate" type="date" bind:value={birthDate} required class="row-input" />
			</div>

			<div class="form-row">
				<label for="email" class="row-label">
					<span class="num">03</span>
					<span class="row-name">電子郵便</span>
				</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					required
					class="row-input"
					placeholder="——"
				/>
			</div>

			<div class="form-row">
				<label for="password" class="row-label">
					<span class="num">04</span>
					<span class="row-name">合言葉</span>
				</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					required
					class="row-input"
					placeholder="——"
				/>
			</div>

			<button type="submit" class="submit-btn">
				登録する <span class="arrow">↦</span>
			</button>

			<p class="back-link">
				既にご登録の方は <a href="/design-d/login">入場券から再入場</a>。
			</p>
		</div>
	</form>
</div>

<style>
	.entry-banner {
		text-align: center;
		max-width: 56rem;
		margin: 0 auto;
	}

	.section-mark {
		display: inline-block;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.35em;
		color: var(--accent);
		border: 1px solid var(--accent);
		padding: 0.25rem 0.75rem;
		margin-bottom: 1rem;
	}

	.entry-title {
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 144,
			'wght' 700;
		font-size: clamp(2.5rem, 6vw, 4rem);
		line-height: 1.05;
		margin: 0;
		letter-spacing: -0.03em;
	}

	.italic {
		font-style: italic;
		color: var(--accent);
	}

	.lede {
		font-family: 'Newsreader', serif;
		font-style: italic;
		font-size: 1.125rem;
		max-width: 42rem;
		margin: 1.5rem auto 0;
		color: var(--ink-soft);
	}

	.rule-double-d {
		border-top: 3px double var(--rule);
		margin: 2rem 0 3rem;
	}

	.register-grid {
		display: grid;
		gap: 4rem;
		grid-template-columns: 1fr;
		max-width: 56rem;
		margin: 0 auto;
	}

	@media (min-width: 900px) {
		.register-grid {
			grid-template-columns: 16rem 1fr;
		}
	}

	.instructions {
		border-top: 1px solid var(--rule);
		padding-top: 1rem;
	}

	.annot {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.3em;
		color: var(--muted);
		margin: 0 0 1rem;
	}

	.rules {
		font-family: 'Newsreader', serif;
		font-size: 0.95rem;
		line-height: 1.65;
		padding-left: 1.25rem;
		margin: 0;
	}

	.rules li {
		margin-bottom: 0.5rem;
	}

	.form-stack {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 12rem 1fr;
		align-items: end;
		gap: 1rem;
		padding: 1rem 0;
		border-bottom: 1px solid var(--rule);
	}

	.row-label {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		font-family: 'Fraunces', serif;
		font-size: 1.0625rem;
	}

	.num {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		color: var(--accent);
		letter-spacing: 0.1em;
	}

	.row-input {
		background: transparent;
		border: none;
		outline: none;
		font-family: 'JetBrains Mono', monospace;
		font-size: 1.0625rem;
		color: var(--ink);
		padding: 0.4rem 0;
		border-bottom: 1px solid transparent;
		width: 100%;
	}

	.row-input:focus {
		border-bottom-color: var(--accent);
	}
	.row-input::placeholder {
		color: var(--muted);
	}

	.submit-btn {
		margin-top: 1.5rem;
		align-self: flex-start;
		background: var(--accent);
		color: var(--paper);
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 144,
			'wght' 600;
		font-size: 1.125rem;
		padding: 0.95rem 2rem;
		border: none;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		transition:
			transform 0.18s ease,
			box-shadow 0.18s ease;
	}

	.submit-btn:hover {
		transform: translate(-2px, -2px);
		box-shadow: 4px 4px 0 var(--ink);
	}

	.arrow {
		font-family: 'JetBrains Mono', monospace;
	}

	.back-link {
		font-family: 'Newsreader', serif;
		font-style: italic;
		color: var(--muted);
		margin: 1rem 0 0;
	}

	.back-link a {
		color: var(--accent);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
