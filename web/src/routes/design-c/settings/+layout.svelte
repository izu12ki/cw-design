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
	<header class="sticky top-0 z-10 flex items-center bg-white px-4 py-3 shadow-sm">
		<a href="/design-c/chats" class="rounded-xl p-2 hover:bg-neutral-100" aria-label="戻る">
			<ChevronLeft class="h-6 w-6 text-[#FF8A65]" />
		</a>
		<h1 class="ml-2 font-bold">設定</h1>
	</header>

	<div class="mx-auto grid max-w-2xl gap-4 p-4 md:grid-cols-[200px_1fr]">
		<nav class="h-fit rounded-3xl bg-white p-2">
			{#each items as it (it.href)}
				<a
					href={it.href}
					class="block rounded-2xl px-4 py-3 text-sm {page.url.pathname === it.href
						? 'bg-[#FF8A65] font-semibold text-white'
						: 'hover:bg-neutral-50'}"
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
