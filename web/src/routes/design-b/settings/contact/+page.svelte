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

<form onsubmit={submit} class="max-w-xl space-y-4 rounded-2xl bg-white p-6 shadow-sm">
	<div class="space-y-2">
		<Label for="subject">件名</Label>
		<Input id="subject" bind:value={subject} required class="rounded-lg" />
	</div>
	<div class="space-y-2">
		<Label for="body">お問い合わせ内容</Label>
		<textarea
			id="body"
			bind:value={body}
			required
			rows="8"
			class="w-full rounded-lg border border-neutral-300 p-3 text-sm focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 focus:outline-none"
		></textarea>
	</div>
	<Button type="submit" class="rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9]">送信</Button>
</form>
