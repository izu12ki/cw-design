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
		goto('/design-c/chats');
	}
</script>

<div class="flex min-h-screen items-center justify-center p-8">
	<form
		onsubmit={submit}
		class="w-full max-w-sm rounded-3xl bg-white p-8 shadow-[0_10px_40px_-10px_rgba(255,138,101,0.3)]"
	>
		<div class="mb-6 text-center">
			<h1 class="text-2xl font-bold">はじめまして</h1>
			<p class="mt-1 text-sm text-neutral-500">アカウントを作成します</p>
		</div>
		<div class="space-y-4">
			<div class="space-y-2">
				<Label for="nickname">ニックネーム</Label>
				<Input id="nickname" bind:value={nickname} required class="h-12 rounded-2xl" />
			</div>
			<div class="space-y-2">
				<Label for="birthDate">生年月日</Label>
				<Input
					id="birthDate"
					type="date"
					bind:value={birthDate}
					required
					class="h-12 rounded-2xl"
				/>
			</div>
			<div class="space-y-2">
				<Label for="email">メールアドレス</Label>
				<Input id="email" type="email" bind:value={email} required class="h-12 rounded-2xl" />
			</div>
			<div class="space-y-2">
				<Label for="password">パスワード</Label>
				<Input
					id="password"
					type="password"
					bind:value={password}
					required
					class="h-12 rounded-2xl"
				/>
			</div>
		</div>
		<Button
			type="submit"
			class="mt-6 h-12 w-full rounded-2xl bg-[#FF8A65] text-base hover:bg-[#F4733E]"
			>登録する</Button
		>
		<p class="mt-4 text-center text-sm text-neutral-600">
			アカウントをお持ちの方は <a href="/design-c/login" class="font-semibold text-[#FF8A65]"
				>ログイン</a
			>
		</p>
	</form>
</div>
