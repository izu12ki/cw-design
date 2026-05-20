<script lang="ts">
	import { goto } from '$app/navigation';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	let open = $state(false);

	function confirm() {
		open = false;
		alert('退会処理が完了しました（モック）');
		goto('/');
	}
</script>

<article class="article">
	<header class="art-head">
		<span class="art-num">FINAL ISSUE · 廃刊届</span>
		<h1 class="art-title">本紙からの<span class="ital">廃刊</span></h1>
	</header>

	<div class="warning-box">
		<div class="warn-mark">! 警告 !</div>
		<p class="warn-body">
			本紙から退会されますと、すべての書簡・寄稿・編集者情報が永久に削除されます。<br />
			一度実行された廃刊届は<span class="strong-red">取り消すことができません</span>。
		</p>
		<ul class="warn-list">
			<li>すべての書簡（チャット履歴）の削除</li>
			<li>すべての画像・動画資料の削除</li>
			<li>編集者プロフィールの抹消</li>
			<li>本紙への再登録は同一郵便アドレスでは三十日後より可能</li>
		</ul>
	</div>

	<div class="action-row">
		<a href="/design-d/chats" class="cancel-link">← やはり残る</a>
		<button type="button" class="press-final" onclick={() => (open = true)}>
			廃刊届を提出する
		</button>
	</div>
</article>

<AlertDialog.Root bind:open>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>本当に廃刊いたしますか？</AlertDialog.Title>
			<AlertDialog.Description>この操作は取り消すことができません。</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>取り消し</AlertDialog.Cancel>
			<AlertDialog.Action onclick={confirm}>退会する</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<style>
	.article {
		max-width: 46rem;
	}

	.art-head {
		margin-bottom: 2rem;
	}

	.art-num {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.3em;
		color: var(--accent);
		display: block;
		margin-bottom: 0.75rem;
	}

	.art-title {
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 144,
			'wght' 700;
		font-size: clamp(2.25rem, 5vw, 3.25rem);
		margin: 0;
		letter-spacing: -0.03em;
		line-height: 1;
	}

	.ital {
		font-style: italic;
		color: var(--accent);
	}

	.warning-box {
		border: 3px double var(--accent);
		padding: 2rem;
		background: rgba(200, 49, 45, 0.04);
		margin-bottom: 2rem;
	}

	.warn-mark {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.875rem;
		letter-spacing: 0.4em;
		color: var(--accent);
		text-align: center;
		margin-bottom: 1.25rem;
		padding-bottom: 1rem;
		border-bottom: 1px dashed var(--accent);
	}

	.warn-body {
		font-family: 'Newsreader', serif;
		font-size: 1.0625rem;
		line-height: 1.7;
		margin: 0 0 1.25rem;
	}

	.strong-red {
		font-style: italic;
		font-weight: 700;
		color: var(--accent);
		text-decoration: underline;
		text-decoration-style: double;
		text-underline-offset: 4px;
	}

	.warn-list {
		font-family: 'Newsreader', serif;
		font-size: 0.95rem;
		line-height: 1.7;
		padding-left: 1.25rem;
		margin: 0;
	}

	.warn-list li {
		margin-bottom: 0.25rem;
	}

	.action-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.cancel-link {
		font-family: 'Fraunces', serif;
		font-size: 1rem;
		font-style: italic;
		color: var(--ink);
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	.cancel-link:hover {
		color: var(--accent);
	}

	.press-final {
		background: var(--accent);
		color: var(--paper);
		border: 1px solid var(--accent);
		padding: 0.95rem 2rem;
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 144,
			'wght' 700;
		font-size: 1.0625rem;
		letter-spacing: -0.01em;
		cursor: pointer;
		transition: all 0.18s ease;
	}

	.press-final:hover {
		background: var(--ink);
		border-color: var(--ink);
		transform: translate(-2px, -2px);
		box-shadow: 4px 4px 0 var(--accent);
	}
</style>
