<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let nickname = $state('');
	let birthDate = $state('');
	let email = $state('');
	let password = $state('');

	function handleSubmit(e: Event) {
		e.preventDefault();
		alert('登録しました（モック）');
		goto('/design-a/chats');
	}
</script>

<div class="flex min-h-screen items-center justify-center p-8">
	<form
		onsubmit={handleSubmit}
		class="w-full max-w-sm rounded-sm border border-neutral-200 bg-white p-8 shadow-sm"
	>
		<h1 class="mb-1 text-xl font-bold text-[#1B4F8B]">新規会員登録</h1>
		<p class="mb-6 text-sm text-neutral-500">アカウントを作成します</p>
		<div class="space-y-4">
			<div class="space-y-1.5">
				<Label for="nickname">ニックネーム</Label>
				<Input id="nickname" bind:value={nickname} required />
			</div>
			<div class="space-y-1.5">
				<Label for="birthDate">生年月日</Label>
				<Input id="birthDate" type="date" bind:value={birthDate} required />
			</div>
			<div class="space-y-1.5">
				<Label for="email">メールアドレス</Label>
				<Input id="email" type="email" bind:value={email} required />
			</div>
			<div class="space-y-1.5">
				<Label for="password">パスワード</Label>
				<Input id="password" type="password" bind:value={password} required />
			</div>
		</div>
		<Button type="submit" class="mt-6 w-full bg-[#1B4F8B] hover:bg-[#163D6D]">登録する</Button>
		<p class="mt-4 text-center text-sm text-neutral-600">
			既にアカウントをお持ちの方は
			<a href="/design-a/login" class="text-[#1B4F8B] underline">ログイン</a>
		</p>
	</form>
</div>
