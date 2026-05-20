<div class="space-y-3">
	{#each [{ q: 'チャットから退会するには？', a: 'チャット画面右上の設定アイコンから「このチャットから退会する」を選択してください。' }, { q: '退会したチャットに戻りたい', a: 'メニュー → 「退会したチャット」から再入会できます。' }, { q: '通知が届きません', a: 'アカウント設定の通知を有効にし、ブラウザの権限を確認してください。' }, { q: 'アプリから退会したい', a: '設定 → 「アプリから退会」から手続きできます。' }] as item, i (i)}
		<details class="rounded-3xl bg-white p-5">
			<summary class="cursor-pointer font-semibold">{item.q}</summary>
			<p class="mt-3 text-sm text-neutral-700">{item.a}</p>
		</details>
	{/each}
</div>
