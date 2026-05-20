<script lang="ts">
  let { children } = $props();
</script>

<div class="design-b min-h-screen bg-neutral-50" data-design="b">
  {@render children()}
</div>

<style>
  :global(.design-b) {
    --accent: #7c3aed;
    --accent-hover: #6d28d9;
    --sidebar-bg: #1a1a2e;
    --sidebar-fg: #e2e8f0;
    --radius: 8px;
  }
</style>
