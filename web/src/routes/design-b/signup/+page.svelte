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

<div class="min-h-screen bg-gradient-to-br from-[#1A1A2E] via-[#16213e] to-[#0f3460] flex items-center justify-center p-8">
  <form onsubmit={submit} class="w-full max-w-md bg-white rounded-2xl p-10 shadow-2xl">
    <div class="w-12 h-12 rounded-xl bg-[#7C3AED] mb-6"></div>
    <h1 class="text-2xl font-bold mb-1">アカウント作成</h1>
    <p class="text-sm text-neutral-500 mb-8">数項目だけで始められます</p>
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
    <Button type="submit" class="w-full mt-8 bg-[#7C3AED] hover:bg-[#6D28D9] h-11 rounded-lg">登録</Button>
    <p class="text-sm text-center mt-6 text-neutral-600">
      アカウントをお持ちの方は <a href="/design-b/login" class="text-[#7C3AED] font-medium">ログイン</a>
    </p>
  </form>
</div>
