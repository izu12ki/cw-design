<script lang="ts">
  import { page } from '$app/state';
  import { MessageSquare, Archive, Settings, LogIn } from '@lucide/svelte';

  let { children } = $props();

  const isAuth = $derived(page.url.pathname.includes('/login') || page.url.pathname.includes('/signup'));

  const nav = [
    { href: '/design-a/chats', icon: MessageSquare, label: 'チャット' },
    { href: '/design-a/archive', icon: Archive, label: '退会済み' },
    { href: '/design-a/settings/account', icon: Settings, label: '設定' }
  ];
</script>

<div class="design-a min-h-screen flex" data-design="a">
  {#if !isAuth}
    <aside class="w-16 bg-[#1B4F8B] flex flex-col items-center py-4 gap-2 text-white">
      <div class="w-10 h-10 rounded bg-white/15 flex items-center justify-center font-bold mb-4">CW</div>
      {#each nav as n (n.href)}
        <a
          href={n.href}
          class="w-12 h-12 rounded flex flex-col items-center justify-center text-[10px] hover:bg-white/15 {page.url.pathname.startsWith(n.href) ? 'bg-white/20' : ''}"
          aria-label={n.label}
        >
          <n.icon class="w-5 h-5" />
          <span class="mt-0.5">{n.label}</span>
        </a>
      {/each}
      <div class="flex-1"></div>
      <a href="/" class="w-12 h-12 rounded flex items-center justify-center hover:bg-white/15" aria-label="戻る">
        <LogIn class="w-5 h-5 rotate-180" />
      </a>
    </aside>
  {/if}
  <main class="flex-1 min-w-0 bg-neutral-50">
    {@render children()}
  </main>
</div>

<style>
  .design-a {
    --accent: #1b4f8b;
    --accent-hover: #163d6d;
    --radius: 4px;
    font-size: 14px;
  }
</style>
