<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';

  let subject = $state('');
  let body = $state('');

  function submit(e: Event) {
    e.preventDefault();
    alert('送信しました（モック）');
    subject = '';
    body = '';
  }
</script>

<div class="max-w-xl">
  <h1 class="text-xl font-bold text-[#1B4F8B] mb-4">お問い合わせ</h1>
  <form onsubmit={submit} class="bg-white border border-neutral-200 rounded-sm p-6 space-y-4">
    <div class="space-y-1.5">
      <Label for="subject">件名</Label>
      <Input id="subject" bind:value={subject} required />
    </div>
    <div class="space-y-1.5">
      <Label for="body">お問い合わせ内容</Label>
      <textarea id="body" bind:value={body} required rows="8" class="w-full border border-neutral-300 rounded-sm p-2 text-sm focus:outline-none focus:border-[#1B4F8B]"></textarea>
    </div>
    <Button type="submit" class="bg-[#1B4F8B] hover:bg-[#163D6D]">送信</Button>
  </form>
</div>
