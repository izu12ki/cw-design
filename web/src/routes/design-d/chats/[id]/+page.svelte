<script lang="ts">
	import { page } from '$app/state';
	import { chatStore } from '$lib/stores/chat-store.svelte';
	import { usersById, CURRENT_USER_ID } from '$lib/mock';
	import { formatTime, formatDateLabel } from '$lib/shared/format';
	import MediaViewer from '$lib/shared/MediaViewer.svelte';

	const chatId = $derived(page.params.id ?? '');
	const chat = $derived(chatStore.getChat(chatId));
	const messages = $derived(chat ? chatStore.getMessages(chatId) : []);

	let input = $state('');
	let viewerOpen = $state(false);
	let viewerSrc = $state('');

	function openImage(src: string) {
		viewerSrc = src;
		viewerOpen = true;
	}

	function send() {
		if (!input.trim()) return;
		chatStore.addMessage(chatId, input);
		input = '';
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) send();
	}

	function plateLabel(idx: number): string {
		const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
		return `PLATE ${romans[idx] ?? idx + 1}`;
	}

	// Group date dividers
	function dateBucket(iso: string) {
		return formatDateLabel(iso);
	}
</script>

{#if !chat}
	<div class="missing py-16 text-center">
		<p class="missing-mark">— 404 —</p>
		<h2 class="missing-title">書簡が見つかりません</h2>
		<a href="/design-d/chats" class="back-link">目次へ戻る</a>
	</div>
{:else}
	{@const plates = messages
		.map((m, i) => (m.type === 'image' || m.type === 'video' ? { id: m.id, n: i } : null))
		.filter((p) => p !== null)}
	{@const plateIdx = (mid: string) => plates.findIndex((p) => p?.id === mid)}

	<article class="thread">
		<header class="thread-head">
			<a href="/design-d/chats" class="crumb">← CONTENTS</a>
			<div class="thread-titleblock">
				<p class="thread-mark">— CORRESPONDENCE —</p>
				<h1 class="thread-title">{chat.name}</h1>
				<p class="thread-deck">
					寄稿者 <span class="b">{chat.memberIds.length}</span> 名 · 往復
					<span class="b">{messages.length}</span> 便
				</p>
			</div>
			<a href={`/design-d/chats/${chatId}/settings`} class="crumb right">SETTINGS →</a>
		</header>

		<div class="rule-dash"></div>

		<section class="letters">
			{#each messages as m, idx (m.id)}
				{@const user = usersById[m.senderId]}
				{@const isMine = m.senderId === CURRENT_USER_ID}
				{@const prevDate = idx > 0 ? dateBucket(messages[idx - 1].createdAt) : null}
				{@const curDate = dateBucket(m.createdAt)}
				{#if curDate !== prevDate}
					<div class="date-band">
						<span class="band-dash"></span>
						<span class="band-text">{curDate}</span>
						<span class="band-dash"></span>
					</div>
				{/if}

				<article class="letter" class:mine={isMine}>
					<header class="letter-head">
						<div class="letter-from">
							<span class="from-key">{isMine ? 'A 拝' : 'From'}</span>
							<span class="from-name">{user.nickname}</span>
						</div>
						<span class="letter-stamp">— {formatTime(m.createdAt)} —</span>
					</header>

					<div class="letter-body">
						{#if m.type === 'text'}
							<p class="prose">{m.body}</p>
						{:else if m.type === 'image'}
							<figure class="plate">
								<button type="button" onclick={() => openImage(m.body)} class="plate-btn">
									<img src={m.body} alt="" />
								</button>
								<figcaption class="plate-caption">
									<span class="plate-mark">{plateLabel(plateIdx(m.id))}</span>
									<span class="plate-text">本文に添えられた図版</span>
								</figcaption>
							</figure>
						{:else if m.type === 'video'}
							<figure class="plate plate-video">
								<video controls poster={m.thumbnailUrl}>
									<source src={m.body} type="video/mp4" />
								</video>
								<figcaption class="plate-caption">
									<span class="plate-mark">{plateLabel(plateIdx(m.id))} · MOVING IMAGE</span>
									<span class="plate-text">動画資料が添付されました</span>
								</figcaption>
							</figure>
						{/if}
					</div>
				</article>
			{/each}
		</section>

		<footer class="composer">
			<div class="composer-head">
				<span class="composer-mark">CORRESPONDENCE / 投函</span>
				<span class="composer-tip">Ctrl + Enter で投函</span>
			</div>
			<div class="composer-body">
				<textarea
					bind:value={input}
					onkeydown={handleKey}
					rows="3"
					placeholder="本文をここに認 (したた) めてください……"
					class="composer-input"
				></textarea>
				<button type="button" onclick={send} class="post-btn">
					投函する <span class="arrow">↦</span>
				</button>
			</div>
		</footer>
	</article>

	<MediaViewer bind:open={viewerOpen} src={viewerSrc} />
{/if}

<style>
	.missing {
		padding-top: 4rem;
	}
	.missing-mark {
		font-family: 'JetBrains Mono', monospace;
		color: var(--accent);
		letter-spacing: 0.4em;
	}
	.missing-title {
		font-family: 'Fraunces', serif;
		font-size: 2rem;
		margin: 0.5rem 0 1rem;
	}
	.back-link {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.75rem;
		letter-spacing: 0.2em;
		color: var(--ink);
		text-decoration: underline;
	}

	.thread {
		padding: 0.5rem 0 2rem;
	}

	.thread-head {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: baseline;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.crumb {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.25em;
		color: var(--ink);
		text-decoration: none;
		justify-self: start;
		align-self: center;
	}

	.crumb.right {
		justify-self: end;
	}
	.crumb:hover {
		color: var(--accent);
	}

	.thread-titleblock {
		text-align: center;
	}

	.thread-mark {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.35em;
		color: var(--muted);
		margin: 0 0 0.5rem;
	}

	.thread-title {
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 144,
			'wght' 700;
		font-style: italic;
		font-size: clamp(2rem, 4.5vw, 3.25rem);
		line-height: 1;
		margin: 0;
		letter-spacing: -0.02em;
	}

	.thread-deck {
		font-family: 'Newsreader', serif;
		font-style: italic;
		font-size: 0.95rem;
		margin: 0.5rem 0 0;
		color: var(--ink-soft);
	}

	.b {
		font-weight: 700;
		color: var(--accent);
	}

	.rule-dash {
		margin: 0.5rem 0 2rem;
		height: 1px;
		background-image: linear-gradient(to right, var(--ink) 50%, transparent 0%);
		background-size: 10px 1px;
	}

	.letters {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.date-band {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: 1rem;
		margin: 1rem 0;
	}

	.band-dash {
		border-top: 1px dashed var(--rule);
		height: 1px;
	}

	.band-text {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: var(--muted);
	}

	.letter {
		max-width: 44rem;
		padding: 0;
	}

	.letter.mine {
		margin-left: auto;
		text-align: right;
	}

	.letter-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 0.5rem;
		gap: 1rem;
	}

	.letter.mine .letter-head {
		flex-direction: row-reverse;
	}

	.letter-from {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
	}

	.from-key {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: var(--accent);
	}

	.from-name {
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 36,
			'wght' 600;
		font-size: 1.25rem;
		font-style: italic;
		color: var(--ink);
		letter-spacing: -0.01em;
	}

	.letter-stamp {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.2em;
		color: var(--muted);
	}

	.letter-body {
		border-top: 1px solid var(--rule);
		padding-top: 0.75rem;
	}

	.letter.mine .letter-body {
		border-top: 1px solid var(--accent);
	}

	.prose {
		font-family: 'Newsreader', serif;
		font-size: 1.0625rem;
		line-height: 1.7;
		margin: 0;
		white-space: pre-wrap;
		hanging-punctuation: first;
		text-indent: 1em;
	}

	.letter.mine .prose {
		text-indent: 0;
	}

	.plate {
		margin: 0;
		max-width: 30rem;
	}

	.letter.mine .plate {
		margin-left: auto;
	}

	.plate-btn {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		display: block;
		width: 100%;
	}

	.plate img,
	.plate video {
		width: 100%;
		display: block;
		filter: grayscale(0.15) contrast(1.05);
		border: 1px solid var(--ink);
	}

	.plate-video video {
		filter: contrast(1.05);
	}

	.plate-caption {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding-top: 0.5rem;
		border-bottom: 1px solid var(--rule);
		padding-bottom: 0.5rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--ink-soft);
	}

	.plate-mark {
		color: var(--accent);
		font-weight: 700;
	}

	.composer {
		margin-top: 4rem;
		border-top: 4px double var(--rule);
		padding-top: 1.5rem;
	}

	.composer-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 0.75rem;
	}

	.composer-mark {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: var(--accent);
	}

	.composer-tip {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.6875rem;
		letter-spacing: 0.15em;
		color: var(--muted);
	}

	.composer-body {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1rem;
		align-items: stretch;
	}

	.composer-input {
		background: var(--paper-2);
		border: 1px solid var(--ink);
		padding: 1rem 1.25rem;
		font-family: 'Newsreader', serif;
		font-size: 1.0625rem;
		line-height: 1.6;
		color: var(--ink);
		resize: vertical;
		outline: none;
	}

	.composer-input::placeholder {
		font-style: italic;
		color: var(--muted);
	}

	.composer-input:focus {
		border-color: var(--accent);
	}

	.post-btn {
		background: var(--ink);
		color: var(--paper);
		font-family: 'Fraunces', serif;
		font-variation-settings:
			'opsz' 144,
			'wght' 600;
		font-size: 1.0625rem;
		padding: 0 1.75rem;
		border: 1px solid var(--ink);
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		transition: all 0.18s ease;
		white-space: nowrap;
	}

	.post-btn:hover {
		background: var(--accent);
		border-color: var(--accent);
		transform: translate(-2px, -2px);
		box-shadow: 4px 4px 0 var(--ink);
	}

	.arrow {
		font-family: 'JetBrains Mono', monospace;
	}
</style>
