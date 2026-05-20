<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();
	const isIndex = $derived(!page.params.id);
</script>

{#if isIndex}
	<div class="py-4">
		{@render children()}
	</div>
{:else}
	{@render children()}
{/if}
