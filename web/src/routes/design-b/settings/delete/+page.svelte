<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	let open = $state(false);

	function confirm() {
		open = false;
		alert('退会処理が完了しました（モック）');
		goto('/');
	}
</script>

<div class="max-w-xl rounded-2xl bg-white p-8 shadow-sm">
	<h2 class="mb-2 text-lg font-bold text-red-600">アプリから退会</h2>
	<p class="text-sm leading-relaxed text-neutral-700">
		アプリから退会すると、すべてのチャットおよびアカウント情報が削除されます。この操作は取り消せません。
	</p>
	<Button variant="destructive" class="mt-4 rounded-xl" onclick={() => (open = true)}
		>退会する</Button
	>
</div>

<AlertDialog.Root bind:open>
	<AlertDialog.Content class="rounded-2xl">
		<AlertDialog.Header>
			<AlertDialog.Title>本当に退会しますか？</AlertDialog.Title>
			<AlertDialog.Description>この操作は取り消せません。</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>キャンセル</AlertDialog.Cancel>
			<AlertDialog.Action onclick={confirm}>退会する</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
