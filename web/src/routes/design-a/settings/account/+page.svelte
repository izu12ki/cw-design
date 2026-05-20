<script lang="ts">
  import { goto } from '$app/navigation';
  import { usersById, CURRENT_USER_ID } from '$lib/mock';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Switch } from '$lib/components/ui/switch';
  import { currentPermission, requestNotificationPermission, sendTestNotification, type NotifyPermission } from '$lib/shared/notify';
  import { onMount } from 'svelte';

  const me = usersById[CURRENT_USER_ID];
  let nickname = $state(me.nickname);
  let birthDate = $state(me.birthDate);
  let email = $state(me.email);
  let password = $state('');
  let permission = $state<NotifyPermission>('default');

  onMount(() => {
    permission = currentPermission();
  });

  async function toggleNotify() {
    if (permission === 'granted') {
      alert('ブラウザの設定から通知を無効にしてください');
      return;
    }
    permission = await requestNotificationPermission();
  }

  function save(e: Event) {
    e.preventDefault();
    alert('保存しました（モック）');
  }

  function logout() {
    if (confirm('ログアウトしますか？')) goto('/design-a/login');
  }
</script>

<div class="max-w-xl">
  <h1 class="text-xl font-bold text-[#1B4F8B] mb-4">アカウント設定</h1>
  <form onsubmit={save} class="bg-white border border-neutral-200 rounded-sm p-6 space-y-4">
    <div class="space-y-1.5">
      <Label for="nickname">ニックネーム</Label>
      <Input id="nickname" bind:value={nickname} />
    </div>
    <div class="space-y-1.5">
      <Label for="birthDate">生年月日</Label>
      <Input id="birthDate" type="date" bind:value={birthDate} />
    </div>
    <div class="space-y-1.5">
      <Label for="email">メールアドレス</Label>
      <Input id="email" type="email" bind:value={email} />
    </div>
    <div class="space-y-1.5">
      <Label for="password">新しいパスワード</Label>
      <Input id="password" type="password" bind:value={password} placeholder="変更しない場合は空欄" />
    </div>
    <Button type="submit" class="bg-[#1B4F8B] hover:bg-[#163D6D]">保存</Button>
  </form>

  <div class="bg-white border border-neutral-200 rounded-sm p-6 mt-6">
    <h2 class="font-bold text-sm mb-3">プッシュ通知</h2>
    <div class="flex items-center justify-between mb-3">
      <span class="text-sm">通知を有効にする</span>
      <Switch checked={permission === 'granted'} onCheckedChange={toggleNotify} disabled={permission === 'unsupported'} />
    </div>
    <p class="text-xs text-neutral-500 mb-3">状態: {permission}</p>
    <Button variant="outline" onclick={() => sendTestNotification()} disabled={permission !== 'granted'}>テスト通知を送る</Button>
  </div>

  <div class="bg-white border border-neutral-200 rounded-sm p-6 mt-6">
    <Button variant="outline" onclick={logout}>ログアウト</Button>
  </div>
</div>
