<script>
  import currentAdventure from "$lib/utils/journey";
  import Button from "$lib/elements/buttons/Button.svelte";
  import SettingsModal from "$lib/elements/modals/SettingsModal.svelte";
  import AboutModal from "$lib/elements/modals/AboutModal.svelte";
  import NewJourneyModal from "$lib/elements/modals/NewJourneyModal.svelte";

  let optionsMenuState = false;
  function toggleOptions() {
    optionsMenuState = !optionsMenuState;
  }

  let restartMenuState = false;
  function toggleRestartPrompt() {
    restartMenuState = !restartMenuState;
  }

  let aboutMenuState = false;
  function toggleAbout() {
    aboutMenuState = !aboutMenuState;
  }
</script>

<div class="toolbar">
  {#if $currentAdventure?.ready}
    <Button action={toggleRestartPrompt}>
      <div class="btn-content" title="Restart journey">
        <strong>🔁</strong>
        <span>Restart journey</span>
      </div>
    </Button>
  {/if}

  <Button action={toggleAbout}>
    <div class="btn-content" title="View settings">
      <strong>❔</strong>
      <span>About</span>
    </div>
  </Button>

  <Button action={toggleOptions}>
    <div class="btn-content" title="View settings">
      <strong>⚙️</strong>
      <span>Settings</span>
    </div>
  </Button>
</div>

<!-- settings dialog -->
{#if optionsMenuState}
  <SettingsModal callback={toggleOptions} />
{/if}

<!-- restart dialog -->
{#if restartMenuState}
  <NewJourneyModal callback={toggleRestartPrompt} />
{/if}

<!-- about dialog -->
{#if aboutMenuState}
  <AboutModal callback={toggleAbout} />
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
