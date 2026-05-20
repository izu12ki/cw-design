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

<div class="min-h-screen flex items-center justify-center p-8">
  <form onsubmit={submit} class="w-full max-w-sm bg-white rounded-3xl p-8 shadow-[0_10px_40px_-10px_rgba(255,138,101,0.3)]">
    <div class="text-center mb-8">
      <div class="w-16 h-16 rounded-full bg-[#FF8A65] mx-auto mb-4"></div>
      <h1 class="text-2xl font-bold">ようこそ</h1>
      <p class="text-sm text-neutral-500 mt-1">続きから始めましょう</p>
    </div>
    <div class="space-y-4">
      <div class="space-y-2">
        <Label for="email">メールアドレス</Label>
        <Input id="email" type="email" bind:value={email} required class="rounded-2xl h-12" />
      </div>
      <div class="space-y-2">
        <Label for="password">パスワード</Label>
        <Input id="password" type="password" bind:value={password} required class="rounded-2xl h-12" />
      </div>
    </div>
    <Button type="submit" class="w-full mt-6 bg-[#FF8A65] hover:bg-[#F4733E] rounded-2xl h-12 text-base">ログイン</Button>
    <p class="text-sm text-center mt-4 text-neutral-600">
      初めての方は <a href="/design-c/signup" class="text-[#FF8A65] font-semibold">新規登録</a>
    </p>
  </form>
</div>
