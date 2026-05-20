<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let nickname = $state('');
	let birthDate = $state('');
	let email = $state('');
	let password = $state('');

	function submit(e: Event) {
		e.preventDefault();
		alert('登録しました（モック）');
		goto('/design-b/chats');
	}
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1A1A2E] via-[#16213e] to-[#0f3460] p-8"
>
	<form onsubmit={submit} class="w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl">
		<div class="mb-6 h-12 w-12 rounded-xl bg-[#7C3AED]"></div>
		<h1 class="mb-1 text-2xl font-bold">アカウント作成</h1>
		<p class="mb-8 text-sm text-neutral-500">数項目だけで始められます</p>
		<div class="space-y-4">
			<div class="space-y-2">
				<Label for="nickname">ニックネーム</Label>
				<Input id="nickname" bind:value={nickname} required class="rounded-lg" />
			</div>
			<div class="space-y-2">
				<Label for="birthDate">生年月日</Label>
				<Input id="birthDate" type="date" bind:value={birthDate} required class="rounded-lg" />
			</div>
			<div class="space-y-2">
				<Label for="email">メールアドレス</Label>
				<Input id="email" type="email" bind:value={email} required class="rounded-lg" />
			</div>
			<div class="space-y-2">
				<Label for="password">パスワード</Label>
				<Input id="password" type="password" bind:value={password} required class="rounded-lg" />
			</div>
		</div>
		<Button type="submit" class="mt-8 h-11 w-full rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9]"
			>登録</Button
		>
		<p class="mt-6 text-center text-sm text-neutral-600">
			アカウントをお持ちの方は <a href="/design-b/login" class="font-medium text-[#7C3AED]"
				>ログイン</a
			>
		</p>
	</form>
</div>
