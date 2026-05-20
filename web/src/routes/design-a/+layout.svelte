<script lang="ts">
	import { page } from '$app/state';
	import { MessageSquare, Archive, Settings, LogIn } from '@lucide/svelte';

	let { children } = $props();

	const isAuth = $derived(
		page.url.pathname.includes('/login') || page.url.pathname.includes('/signup')
	);

	const nav = [
		{ href: '/design-a/chats', icon: MessageSquare, label: 'チャット' },
		{ href: '/design-a/archive', icon: Archive, label: '退会済み' },
		{ href: '/design-a/settings/account', icon: Settings, label: '設定' }
	];
</script>

<div class="design-a flex min-h-screen" data-design="a">
	{#if !isAuth}
		<aside class="flex w-16 flex-col items-center gap-2 bg-[#1B4F8B] py-4 text-white">
			<div class="mb-4 flex h-10 w-10 items-center justify-center rounded bg-white/15 font-bold">
				CW
			</div>
			{#each nav as n (n.href)}
				<a
					href={n.href}
					class="flex h-12 w-12 flex-col items-center justify-center rounded text-[10px] hover:bg-white/15 {page.url.pathname.startsWith(
						n.href
					)
						? 'bg-white/20'
						: ''}"
					aria-label={n.label}
				>
					<n.icon class="h-5 w-5" />
					<span class="mt-0.5">{n.label}</span>
				</a>
			{/each}
			<div class="flex-1"></div>
			<a
				href="/"
				class="flex h-12 w-12 items-center justify-center rounded hover:bg-white/15"
				aria-label="戻る"
			>
				<LogIn class="h-5 w-5 rotate-180" />
			</a>
		</aside>
	{/if}
	<main class="min-w-0 flex-1 bg-neutral-50">
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
