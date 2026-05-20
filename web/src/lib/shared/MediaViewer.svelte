<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog';

  let { open = $bindable(false), src = '' }: { open?: boolean; src?: string } = $props();
</script>

<Dialog.Root bind:open>
  <Dialog.Content class="max-w-4xl p-0 bg-transparent border-0 shadow-none">
    <img {src} alt="" class="w-full h-auto rounded" />
  </Dialog.Content>
</Dialog.Root>
