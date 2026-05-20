<article class="article">
	<header class="art-head">
		<span class="art-num">TERMS · MMXXVI</span>
		<h1 class="art-title">本紙社則</h1>
	</header>

	<div class="columns">
		<section class="clause">
			<h2 class="clause-h"><span class="clause-num">§1</span> 適用</h2>
			<p class="clause-body">
				<span class="dropcap">本</span
				>規約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。利用者が本サービスをご利用になられた時点で、本規約の全条項に同意されたものとみなします。
			</p>
		</section>

		<section class="clause">
			<h2 class="clause-h"><span class="clause-num">§2</span> 利用登録</h2>
			<p class="clause-body">
				登録希望者が当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。登録情報の真実性については、登録者がその責任を負うものとします。
			</p>
		</section>

		<section class="clause">
			<h2 class="clause-h"><span class="clause-num">§3</span> 禁止事項</h2>
			<p class="clause-body">
				ユーザーは、本サービスの利用にあたり、法令または公序良俗に違反する行為、犯罪行為に関連する行為、当社のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為等を行ってはなりません。
			</p>
		</section>

		<section class="clause">
			<h2 class="clause-h"><span class="clause-num">§4</span> 提供の停止</h2>
			<p class="clause-body">
				当社は、本サービスのいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断できるものとします。
			</p>
		</section>
	</div>

	<footer class="article-foot">
		<div class="rule-thin"></div>
		<p class="signed">— 発行 · 編集部 · 二〇二六年五月</p>
	</footer>
</article>

<style>
	.article {
		max-width: 56rem;
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
		font-size: 2.25rem;
		font-style: italic;
		margin: 0;
		letter-spacing: -0.02em;
	}

	.columns {
		column-count: 1;
		column-gap: 2.5rem;
	}

	@media (min-width: 800px) {
		.columns {
			column-count: 2;
		}
	}

	.clause {
		break-inside: avoid;
		margin-bottom: 2rem;
	}

	.clause-h {
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 24,
			'wght' 600;
		font-size: 1.25rem;
		margin: 0 0 0.5rem;
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		padding-bottom: 0.25rem;
		border-bottom: 1px solid var(--rule);
	}

	.clause-num {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		color: var(--accent);
		letter-spacing: 0.05em;
	}

	.clause-body {
		font-family: 'Newsreader', serif;
		font-size: 1rem;
		line-height: 1.75;
		margin: 0.5rem 0 0;
		hanging-punctuation: first;
		text-align: justify;
		hyphens: auto;
	}

	.dropcap {
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 144,
			'wght' 700;
		font-size: 3.25rem;
		float: left;
		line-height: 0.85;
		margin: 0.15rem 0.4rem 0 0;
		color: var(--accent);
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
