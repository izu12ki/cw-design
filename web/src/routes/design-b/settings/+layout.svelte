<script lang="ts">
  import { page } from '$app/state';

  let { children } = $props();

  const items = [
    { href: '/design-b/settings/account', label: 'アカウント' },
    { href: '/design-b/settings/contact', label: 'お問い合わせ' },
    { href: '/design-b/settings/terms', label: '利用規約' },
    { href: '/design-b/settings/faq', label: 'FAQ' },
    { href: '/design-b/settings/privacy', label: 'プライバシー' },
    { href: '/design-b/settings/delete', label: 'アプリ退会' }
  ];
</script>

<div class="max-w-5xl mx-auto p-8">
  <h1 class="text-2xl font-bold mb-6">設定</h1>
  <nav class="flex gap-2 mb-6 border-b border-neutral-200 overflow-x-auto">
    {#each items as it (it.href)}
      <a
        href={it.href}
        class="px-4 py-3 text-sm whitespace-nowrap border-b-2 {page.url.pathname === it.href ? 'border-[#7C3AED] text-[#7C3AED] font-semibold' : 'border-transparent text-neutral-600 hover:text-neutral-900'}"
      >
        {it.label}
      </a>
    {/each}
  </nav>
  {@render children()}
</div>
