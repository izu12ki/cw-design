<script lang="ts">
	let { children } = $props();
</script>

<div class="design-c min-h-screen" data-design="c">
	{@render children()}
</div>

<style>
	:global(.design-c) {
		--accent: #ff8a65;
		--accent-hover: #f4733e;
		--bg: #fff8f3;
		--radius: 16px;
		background-color: #fff8f3;
	}
</style>
