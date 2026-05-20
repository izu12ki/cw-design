<div class="space-y-3 max-w-2xl">
  {#each [
    { q: 'チャットから退会するには？', a: 'チャット画面右上の設定アイコンから「このチャットから退会する」を選択してください。' },
    { q: '退会したチャットに戻りたい', a: 'サイドバーの「退会済みチャット」から再入会できます。' },
    { q: '通知が届きません', a: 'アカウント設定の通知を有効にし、ブラウザの権限を確認してください。' },
    { q: 'アプリから退会したい', a: '設定 → 「アプリ退会」から手続きできます。' }
  ] as item, i (i)}
    <details class="bg-white rounded-2xl shadow-sm p-5">
      <summary class="font-semibold cursor-pointer">{item.q}</summary>
      <p class="text-sm text-neutral-700 mt-3">{item.a}</p>
    </details>
  {/each}
</div>
