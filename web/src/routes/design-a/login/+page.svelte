<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let email = $state('');
	let password = $state('');

	function handleSubmit(e: Event) {
		e.preventDefault();
		alert('ログインしました（モック）');
		goto('/design-a/chats');
	}
</script>

<div class="flex min-h-screen items-center justify-center p-8">
	<form
		onsubmit={handleSubmit}
		class="w-full max-w-sm rounded-sm border border-neutral-200 bg-white p-8 shadow-sm"
	>
		<h1 class="mb-1 text-xl font-bold text-[#1B4F8B]">ログイン</h1>
		<p class="mb-6 text-sm text-neutral-500">アカウント情報を入力してください</p>
		<div class="space-y-4">
			<div class="space-y-1.5">
				<Label for="email">メールアドレス</Label>
				<Input id="email" type="email" bind:value={email} required />
			</div>
			<div class="space-y-1.5">
				<Label for="password">パスワード</Label>
				<Input id="password" type="password" bind:value={password} required />
			</div>
		</div>
		<Button type="submit" class="mt-6 w-full bg-[#1B4F8B] hover:bg-[#163D6D]">ログイン</Button>
		<p class="mt-4 text-center text-sm text-neutral-600">
			アカウントをお持ちでない方は
			<a href="/design-a/signup" class="text-[#1B4F8B] underline">新規登録</a>
		</p>
	</form>
</div>
