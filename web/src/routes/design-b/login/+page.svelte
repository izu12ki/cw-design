<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let email = $state('');
	let password = $state('');

	function submit(e: Event) {
		e.preventDefault();
		alert('ログインしました（モック）');
		goto('/design-b/chats');
	}
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1A1A2E] via-[#16213e] to-[#0f3460] p-8"
>
	<form onsubmit={submit} class="w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl">
		<div class="mb-6 h-12 w-12 rounded-xl bg-[#7C3AED]"></div>
		<h1 class="mb-1 text-2xl font-bold">おかえりなさい</h1>
		<p class="mb-8 text-sm text-neutral-500">アカウントにログイン</p>
		<div class="space-y-5">
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
			>ログイン</Button
		>
		<p class="mt-6 text-center text-sm text-neutral-600">
			新規の方は <a href="/design-b/signup" class="font-medium text-[#7C3AED]">登録</a>
		</p>
	</form>
</div>
