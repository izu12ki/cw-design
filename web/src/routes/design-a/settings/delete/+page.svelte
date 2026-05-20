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

<div class="max-w-xl">
  <h1 class="text-xl font-bold text-red-600 mb-4">アプリから退会</h1>
  <div class="bg-white border border-neutral-200 rounded-sm p-6">
    <p class="text-sm leading-relaxed text-neutral-700">
      アプリから退会すると、すべてのチャットおよびアカウント情報が削除されます。
      この操作は取り消せません。
    </p>
    <Button variant="destructive" class="mt-4" onclick={() => (open = true)}>退会する</Button>
  </div>

  <AlertDialog.Root bind:open>
    <AlertDialog.Content>
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
</div>
