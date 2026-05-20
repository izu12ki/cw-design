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

<form onsubmit={submit} class="bg-white rounded-2xl shadow-sm p-6 space-y-4 max-w-xl">
  <div class="space-y-2">
    <Label for="subject">件名</Label>
    <Input id="subject" bind:value={subject} required class="rounded-lg" />
  </div>
  <div class="space-y-2">
    <Label for="body">お問い合わせ内容</Label>
    <textarea id="body" bind:value={body} required rows="8" class="w-full border border-neutral-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"></textarea>
  </div>
  <Button type="submit" class="bg-[#7C3AED] hover:bg-[#6D28D9] rounded-xl">送信</Button>
</form>
