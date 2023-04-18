<script>
  import Button from "$lib/elements/buttons/Button.svelte";
  import SettingsModal from "$lib/elements/modals/SettingsModal.svelte";

  let optionsMenuState = false;
  function toggleOptions() {
    optionsMenuState = !optionsMenuState;
  }
</script>

<div class="toolbar">
  <Button action={toggleOptions}>
    <div class="btn-content">
      <strong>⚙️</strong>
      <span>Settings</span>
    </div>
  </Button>
</div>

<!-- settings dialog -->
{#if optionsMenuState}
  <SettingsModal callback={toggleOptions} />
{/if}

<style lang="postcss">
  .toolbar {
    @apply flex flex-row flex-wrap gap-2 items-stretch;
  }

  .btn-content {
    @apply inline-block;
  }
  .btn-content span {
    @apply hidden sm:inline;
  }
</style>
