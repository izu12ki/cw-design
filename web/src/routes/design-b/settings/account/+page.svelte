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
    if (confirm('ログアウトしますか？')) goto('/design-b/login');
  }
</script>

<div class="grid md:grid-cols-2 gap-6">
  <form onsubmit={save} class="bg-white rounded-2xl shadow-sm p-6 space-y-4">
    <h2 class="font-semibold mb-2">基本情報</h2>
    <div class="space-y-2">
      <Label for="nickname">ニックネーム</Label>
      <Input id="nickname" bind:value={nickname} class="rounded-lg" />
    </div>
    <div class="space-y-2">
      <Label for="birthDate">生年月日</Label>
      <Input id="birthDate" type="date" bind:value={birthDate} class="rounded-lg" />
    </div>
    <div class="space-y-2">
      <Label for="email">メールアドレス</Label>
      <Input id="email" type="email" bind:value={email} class="rounded-lg" />
    </div>
    <div class="space-y-2">
      <Label for="password">新しいパスワード</Label>
      <Input id="password" type="password" bind:value={password} placeholder="変更しない場合は空欄" class="rounded-lg" />
    </div>
    <Button type="submit" class="bg-[#7C3AED] hover:bg-[#6D28D9] rounded-xl">保存</Button>
  </form>

  <div class="space-y-6">
    <div class="bg-white rounded-2xl shadow-sm p-6">
      <h2 class="font-semibold mb-3">プッシュ通知</h2>
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm">通知を有効にする</span>
        <Switch checked={permission === 'granted'} onCheckedChange={toggleNotify} disabled={permission === 'unsupported'} />
      </div>
      <p class="text-xs text-neutral-500 mb-3">状態: {permission}</p>
      <Button variant="outline" class="rounded-xl" onclick={() => sendTestNotification()} disabled={permission !== 'granted'}>テスト通知</Button>
    </div>
    <div class="bg-white rounded-2xl shadow-sm p-6">
      <Button variant="outline" class="rounded-xl" onclick={logout}>ログアウト</Button>
    </div>
  </div>
</div>
