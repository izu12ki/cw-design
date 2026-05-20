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

<form onsubmit={submit} class="space-y-4 rounded-3xl bg-white p-6">
	<div class="space-y-2">
		<Label for="subject">件名</Label>
		<Input id="subject" bind:value={subject} required class="h-12 rounded-2xl" />
	</div>
	<div class="space-y-2">
		<Label for="body">お問い合わせ内容</Label>
		<textarea
			id="body"
			bind:value={body}
			required
			rows="8"
			class="w-full rounded-2xl border border-neutral-200 p-3 focus:border-[#FF8A65] focus:outline-none"
		></textarea>
	</div>
	<Button type="submit" class="h-12 w-full rounded-2xl bg-[#FF8A65] hover:bg-[#F4733E]">送信</Button
	>
</form>
