<div class="max-w-2xl">
  <h1 class="text-xl font-bold text-[#1B4F8B] mb-4">よくあるご質問</h1>
  <div class="space-y-3">
    {#each [
      { q: 'チャットから退会するには？', a: 'チャット画面右上の設定アイコンから「このチャットから退会する」を選択してください。' },
      { q: '退会したチャットに戻りたい', a: '左ナビの「退会済み」から該当チャットを選び、「再入会」を押してください。' },
      { q: '通知が届きません', a: 'アカウント設定の通知を有効にし、ブラウザの権限を確認してください。' },
      { q: 'アプリから退会したい', a: '設定 → 「アプリから退会」から手続きできます。' }
    ] as item, i (i)}
      <details class="bg-white border border-neutral-200 rounded-sm p-4">
        <summary class="font-medium cursor-pointer">{item.q}</summary>
        <p class="text-sm text-neutral-700 mt-2">{item.a}</p>
      </details>
    {/each}
  </div>
</div>
