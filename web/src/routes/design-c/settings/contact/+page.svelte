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

<form onsubmit={submit} class="bg-white rounded-3xl p-6 space-y-4">
  <div class="space-y-2">
    <Label for="subject">件名</Label>
    <Input id="subject" bind:value={subject} required class="rounded-2xl h-12" />
  </div>
  <div class="space-y-2">
    <Label for="body">お問い合わせ内容</Label>
    <textarea id="body" bind:value={body} required rows="8" class="w-full border border-neutral-200 rounded-2xl p-3 focus:outline-none focus:border-[#FF8A65]"></textarea>
  </div>
  <Button type="submit" class="bg-[#FF8A65] hover:bg-[#F4733E] rounded-2xl h-12 w-full">送信</Button>
</form>
