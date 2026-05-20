<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();

	const items = [
		{ href: '/design-a/settings/account', label: 'アカウント' },
		{ href: '/design-a/settings/contact', label: 'お問い合わせ' },
		{ href: '/design-a/settings/terms', label: '利用規約' },
		{ href: '/design-a/settings/faq', label: 'よくあるご質問' },
		{ href: '/design-a/settings/privacy', label: 'プライバシーポリシー' },
		{ href: '/design-a/settings/delete', label: 'アプリから退会' }
	];
</script>

<div class="flex h-screen">
	<aside class="w-[240px] border-r border-neutral-200 bg-white">
		<header class="border-b border-neutral-200 p-4 font-bold text-[#1B4F8B]">設定</header>
		<ul>
			{#each items as it (it.href)}
				<li>
					<a
						href={it.href}
						class="block border-b border-neutral-100 px-4 py-3 text-sm hover:bg-neutral-50 {page.url
							.pathname === it.href
							? 'bg-[#E8F0FA] font-medium text-[#1B4F8B]'
							: ''}"
					>
						{it.label}
					</a>
				</li>
			{/each}
		</ul>
	</aside>
	<section class="flex-1 overflow-y-auto p-6">
		{@render children()}
	</section>
</div>
