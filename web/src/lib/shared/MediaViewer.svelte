<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';

	let { open = $bindable(false), src = '' }: { open?: boolean; src?: string } = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-w-4xl border-0 bg-transparent p-0 shadow-none">
		<img {src} alt="" class="h-auto w-full rounded" />
	</Dialog.Content>
</Dialog.Root>
