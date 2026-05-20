<script lang="ts">
	import { goto } from '$app/navigation';
	import { usersById, CURRENT_USER_ID } from '$lib/mock';
	import {
		currentPermission,
		requestNotificationPermission,
		sendTestNotification,
		type NotifyPermission
	} from '$lib/shared/notify';
	import { onMount } from 'svelte';

	const me = usersById[CURRENT_USER_ID];
	let nickname = $state(me.nickname);
	let birthDate = $state(me.birthDate);
	let email = $state(me.email);
	let password = $state('');
	let permission = $state<NotifyPermission>('default');

	onMount(() => {
		permission = currentPermission();
	});

	async function toggleNotify() {
		if (permission === 'granted') {
			alert('ブラウザの設定から通知を無効にしてください');
			return;
		}
		permission = await requestNotificationPermission();
	}

	function save(e: Event) {
		e.preventDefault();
		alert('保存しました（モック）');
	}

	function logout() {
		if (confirm('ログアウトしますか？')) goto('/design-d/login');
	}
</script>

<article class="article">
	<header class="art-head">
		<span class="art-num">CHAPTER 01</span>
		<h1 class="art-title">編集者プロフィール</h1>
	</header>

	<div class="lede-block">
		<p class="lede-prose">
			本紙の編集者としての記録をここで更新できます。<br />
			変更内容は<span class="ital">即時に</span>反映されます。
		</p>
	</div>

	<div class="rule-double-d"></div>

	<form onsubmit={save} class="form-grid">
		<div class="form-row">
			<label for="nickname" class="row-label"><span class="num">i.</span> 筆名</label>
			<input id="nickname" bind:value={nickname} class="row-input" />
		</div>
		<div class="form-row">
			<label for="birthDate" class="row-label"><span class="num">ii.</span> 生年月日</label>
			<input id="birthDate" type="date" bind:value={birthDate} class="row-input" />
		</div>
		<div class="form-row">
			<label for="email" class="row-label"><span class="num">iii.</span> 電子郵便</label>
			<input id="email" type="email" bind:value={email} class="row-input" />
		</div>
		<div class="form-row">
			<label for="password" class="row-label"><span class="num">iv.</span> 新しい合言葉</label>
			<input
				id="password"
				type="password"
				bind:value={password}
				placeholder="変更しない場合は空欄"
				class="row-input"
			/>
		</div>

		<div class="actions">
			<button type="submit" class="save-btn">記録を更新する</button>
		</div>
	</form>

	<div class="rule-thin"></div>

	<section class="notify">
		<header class="art-head">
			<span class="art-num">CHAPTER 02</span>
			<h2 class="art-title">通知（電報）</h2>
		</header>
		<p class="notify-text">新たな書簡が届きましたら、ブラウザの通知でお知らせいたします。</p>
		<div class="notify-row">
			<div>
				<p class="notify-state">状態 — <span class="state-mark">{permission}</span></p>
				<button
					type="button"
					class="toggle-btn"
					onclick={toggleNotify}
					disabled={permission === 'unsupported'}
				>
					{permission === 'granted' ? '通知は有効です' : '通知を有効化する'}
				</button>
			</div>
			<button
				type="button"
				class="ghost-btn"
				onclick={() => sendTestNotification()}
				disabled={permission !== 'granted'}
			>
				試し打ちを送る →
			</button>
		</div>
	</section>

	<div class="rule-thin"></div>

	<section class="logout-sec">
		<header class="art-head">
			<span class="art-num">CHAPTER 03</span>
			<h2 class="art-title">退室</h2>
		</header>
		<button type="button" class="logout-btn" onclick={logout}> 本紙からログアウト → </button>
	</section>
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

	.lede-block {
		margin-bottom: 1.5rem;
	}

	.lede-prose {
		font-family: 'Newsreader', serif;
		font-size: 1.0625rem;
		line-height: 1.6;
		margin: 0;
	}

	.ital {
		font-style: italic;
		color: var(--accent);
	}

	.rule-double-d {
		border-top: 3px double var(--rule);
		margin: 1rem 0 2rem;
	}

	.rule-thin {
		border-top: 1px dotted var(--rule);
		margin: 3rem 0;
	}

	.form-grid {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.form-row {
		display: grid;
		grid-template-columns: 12rem 1fr;
		align-items: end;
		gap: 1rem;
		padding: 1rem 0;
		border-bottom: 1px dotted var(--rule);
	}

	.row-label {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		font-family: 'Fraunces', serif;
		font-size: 1rem;
	}

	.num {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		color: var(--accent);
	}

	.row-input {
		background: transparent;
		border: none;
		outline: none;
		font-family: 'JetBrains Mono', monospace;
		font-size: 1rem;
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

	.actions {
		padding-top: 1.5rem;
	}

	.save-btn {
		background: var(--ink);
		color: var(--paper);
		border: 1px solid var(--ink);
		padding: 0.85rem 1.5rem;
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 144,
			'wght' 600;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.18s ease;
	}

	.save-btn:hover {
		background: var(--accent);
		border-color: var(--accent);
		transform: translate(-2px, -2px);
		box-shadow: 4px 4px 0 var(--ink);
	}

	.notify-text {
		font-family: 'Newsreader', serif;
		font-size: 1rem;
		line-height: 1.6;
		margin: 0 0 1.5rem;
	}

	.notify-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.notify-state {
		font-family: 'Newsreader', serif;
		font-size: 0.9rem;
		font-style: italic;
		margin: 0 0 0.5rem;
		color: var(--ink-soft);
	}

	.state-mark {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		font-style: normal;
		color: var(--accent);
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.toggle-btn {
		background: transparent;
		border: 1px solid var(--ink);
		padding: 0.65rem 1.25rem;
		font-family: 'Fraunces', serif;
		font-size: 0.95rem;
		cursor: pointer;
		transition: all 0.18s ease;
	}

	.toggle-btn:not(:disabled):hover {
		background: var(--ink);
		color: var(--paper);
	}

	.toggle-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.ghost-btn {
		background: transparent;
		border: 1px dashed var(--accent);
		color: var(--accent);
		padding: 0.65rem 1.25rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.8125rem;
		letter-spacing: 0.1em;
		cursor: pointer;
		transition: all 0.18s ease;
	}

	.ghost-btn:not(:disabled):hover {
		background: var(--accent);
		color: var(--paper);
	}

	.ghost-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.logout-btn {
		background: transparent;
		border: 1px solid var(--ink);
		padding: 0.85rem 1.5rem;
		font-family: 'Fraunces', serif;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.18s ease;
	}

	.logout-btn:hover {
		background: var(--ink);
		color: var(--paper);
	}
</style>
