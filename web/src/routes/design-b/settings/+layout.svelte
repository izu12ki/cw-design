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

<div class="mx-auto max-w-5xl p-8">
	<h1 class="mb-6 text-2xl font-bold">設定</h1>
	<nav class="mb-6 flex gap-2 overflow-x-auto border-b border-neutral-200">
		{#each items as it (it.href)}
			<a
				href={it.href}
				class="border-b-2 px-4 py-3 text-sm whitespace-nowrap {page.url.pathname === it.href
					? 'border-[#7C3AED] font-semibold text-[#7C3AED]'
					: 'border-transparent text-neutral-600 hover:text-neutral-900'}"
			>
				{it.label}
			</a>
		{/each}
	</nav>
	{@render children()}
</div>
