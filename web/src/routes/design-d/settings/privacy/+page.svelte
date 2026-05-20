<article class="article">
	<header class="art-head">
		<span class="art-num">PRIVACY POLICY</span>
		<h1 class="art-title">個人情報<span class="ital">取扱書</span></h1>
		<p class="lede">本紙が読者の個人情報をいかに取り扱うかの宣言です。</p>
	</header>

	<div class="rule-double-d"></div>

	<ol class="policy-list">
		<li class="policy-item">
			<div class="item-mark">条 一</div>
			<div class="item-body">
				<h2>個人情報の取得</h2>
				<p>
					当社は、利用者の個人情報を、適法かつ公正な手段により取得いたします。利用者の同意なく不正な手段で取得することはございません。
				</p>
			</div>
		</li>
		<li class="policy-item">
			<div class="item-mark">条 二</div>
			<div class="item-body">
				<h2>利用目的</h2>
				<p>
					本サービスの提供、本人確認、お問い合わせへの対応、利用規約に違反する行為への対応に利用します。
				</p>
			</div>
		</li>
		<li class="policy-item">
			<div class="item-mark">条 三</div>
			<div class="item-body">
				<h2>第三者提供</h2>
				<p>法令に基づく場合を除き、利用者の同意なく第三者に個人情報を提供することはありません。</p>
			</div>
		</li>
		<li class="policy-item">
			<div class="item-mark">条 四</div>
			<div class="item-body">
				<h2>開示・訂正</h2>
				<p>
					利用者ご本人からの個人情報の開示、訂正、削除のご要望には、本人確認の上、合理的な範囲で対応します。
				</p>
			</div>
		</li>
	</ol>

	<footer class="article-foot">
		<div class="rule-thin"></div>
		<p class="signed">— 本書は二〇二六年五月二〇日 改訂 —</p>
	</footer>
</article>

<style>
	.article {
		max-width: 54rem;
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
		font-size: clamp(2.5rem, 5vw, 3.5rem);
		margin: 0;
		letter-spacing: -0.03em;
		line-height: 1;
	}

	.ital {
		font-style: italic;
		color: var(--accent);
	}

	.lede {
		font-family: 'Newsreader', serif;
		font-style: italic;
		font-size: 1.125rem;
		margin: 1rem 0 0;
		color: var(--ink-soft);
	}

	.rule-double-d {
		border-top: 3px double var(--rule);
		margin: 2rem 0 2.5rem;
	}

	.policy-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.policy-item {
		display: grid;
		grid-template-columns: 8rem 1fr;
		gap: 2rem;
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--rule);
	}

	.policy-item:first-child {
		border-top: 1px solid var(--rule);
	}

	.item-mark {
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 72,
			'wght' 500;
		font-style: italic;
		font-size: 1.75rem;
		color: var(--accent);
		line-height: 1;
		padding-top: 0.5rem;
	}

	.item-body h2 {
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 36,
			'wght' 600;
		font-size: 1.375rem;
		margin: 0 0 0.5rem;
		letter-spacing: -0.01em;
	}

	.item-body p {
		font-family: 'Newsreader', serif;
		font-size: 1.0625rem;
		line-height: 1.7;
		margin: 0;
	}

	.article-foot {
		margin-top: 3rem;
	}

	.rule-thin {
		border-top: 1px dotted var(--rule);
		margin-bottom: 0.75rem;
	}

	.signed {
		font-family: 'Fraunces', serif;
		font-style: italic;
		font-size: 0.9rem;
		text-align: right;
		color: var(--muted);
		margin: 0;
	}
</style>
