<script lang="ts">
  import { page } from '$app/state';
  import { ChevronLeft } from '@lucide/svelte';

  let { children } = $props();

  const items = [
    { href: '/design-c/settings/account', label: 'アカウント' },
    { href: '/design-c/settings/contact', label: 'お問い合わせ' },
    { href: '/design-c/settings/terms', label: '利用規約' },
    { href: '/design-c/settings/faq', label: 'よくあるご質問' },
    { href: '/design-c/settings/privacy', label: 'プライバシーポリシー' },
    { href: '/design-c/settings/delete', label: 'アプリから退会' }
  ];
</script>

<div class="min-h-screen">
  <header class="flex items-center px-4 py-3 bg-white shadow-sm sticky top-0 z-10">
    <a href="/design-c/chats" class="p-2 rounded-xl hover:bg-neutral-100" aria-label="戻る">
      <ChevronLeft class="w-6 h-6 text-[#FF8A65]" />
    </a>
    <h1 class="font-bold ml-2">設定</h1>
  </header>

  <div class="max-w-2xl mx-auto p-4 grid md:grid-cols-[200px_1fr] gap-4">
    <nav class="bg-white rounded-3xl p-2 h-fit">
      {#each items as it (it.href)}
        <a
          href={it.href}
          class="block px-4 py-3 rounded-2xl text-sm {page.url.pathname === it.href ? 'bg-[#FF8A65] text-white font-semibold' : 'hover:bg-neutral-50'}"
        >
          {it.label}
        </a>
      {/each}
    </nav>
    <div>
      {@render children()}
    </div>
  </div>
</div>
