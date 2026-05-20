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

<div class="min-h-screen flex items-center justify-center p-8">
  <form onsubmit={submit} class="w-full max-w-sm bg-white rounded-3xl p-8 shadow-[0_10px_40px_-10px_rgba(255,138,101,0.3)]">
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold">はじめまして</h1>
      <p class="text-sm text-neutral-500 mt-1">アカウントを作成します</p>
    </div>
    <div class="space-y-4">
      <div class="space-y-2">
        <Label for="nickname">ニックネーム</Label>
        <Input id="nickname" bind:value={nickname} required class="rounded-2xl h-12" />
      </div>
      <div class="space-y-2">
        <Label for="birthDate">生年月日</Label>
        <Input id="birthDate" type="date" bind:value={birthDate} required class="rounded-2xl h-12" />
      </div>
      <div class="space-y-2">
        <Label for="email">メールアドレス</Label>
        <Input id="email" type="email" bind:value={email} required class="rounded-2xl h-12" />
      </div>
      <div class="space-y-2">
        <Label for="password">パスワード</Label>
        <Input id="password" type="password" bind:value={password} required class="rounded-2xl h-12" />
      </div>
    </div>
    <Button type="submit" class="w-full mt-6 bg-[#FF8A65] hover:bg-[#F4733E] rounded-2xl h-12 text-base">登録する</Button>
    <p class="text-sm text-center mt-4 text-neutral-600">
      アカウントをお持ちの方は <a href="/design-c/login" class="text-[#FF8A65] font-semibold">ログイン</a>
    </p>
  </form>
</div>
