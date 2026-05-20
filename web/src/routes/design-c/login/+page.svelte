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
		goto('/design-c/chats');
	}
</script>

<div class="flex min-h-screen items-center justify-center p-8">
	<form
		onsubmit={submit}
		class="w-full max-w-sm rounded-3xl bg-white p-8 shadow-[0_10px_40px_-10px_rgba(255,138,101,0.3)]"
	>
		<div class="mb-8 text-center">
			<div class="mx-auto mb-4 h-16 w-16 rounded-full bg-[#FF8A65]"></div>
			<h1 class="text-2xl font-bold">ようこそ</h1>
			<p class="mt-1 text-sm text-neutral-500">続きから始めましょう</p>
		</div>
		<div class="space-y-4">
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
			>ログイン</Button
		>
		<p class="mt-4 text-center text-sm text-neutral-600">
			初めての方は <a href="/design-c/signup" class="font-semibold text-[#FF8A65]">新規登録</a>
		</p>
	</form>
</div>
