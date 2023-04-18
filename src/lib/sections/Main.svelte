<script>
  import { settings } from "$lib/utils/settings.js";
  import currentAdventure, { startNewAdventure } from "$lib/utils/journey";

  import Button from "../elements/buttons/Button.svelte";
  import Adventure from "./Adventure.svelte";
</script>

<main>
  {#if !($settings.GPTKey && $settings.channel)}
    <div class="infobox">
      <img src="img/donk-notes.webp" width="100" height="100" alt="DonkG by xPatrck" />

      <div class="prose">
        <h2>Greetings, travelers!</h2>
        <p>
          Before we begin, please visit the <strong>⚙️ Settings</strong> menu.
          <br />
          You will have to connect to Twitch and ChatGPT first.
        </p>
      </div>

      <div class="arrow-taunt">↑</div>
    </div>
  {:else if !$currentAdventure}
    <div class="infobox">
      <img src="img/donk-shaman.webp" width="100" height="100" alt="DonkShaman by Raidenshi" />

      <div class="prose">
        <h2>We are ready to begin!</h2>
        <p>
          You may want to check the settings before we start.
          <br />
          Otherwise the journey starts at your command.
        </p>
      </div>

      <div class="my-8">
        <Button big={true} action={startNewAdventure}>START ADVENTURE</Button>
      </div>
    </div>
  {:else if !$currentAdventure.ready && $currentAdventure.errors.length > 0}
    <div class="infobox">
      <img src="img/donk-chat.webp" width="100" height="100" alt="DonkCrayon by juAnSuckS" />
      <div class="prose">
        <h2 class="text-rose-500">Uhh... It's not working!</h2>
        <p class="mb-4">Here are the errors:</p>

        {#each $currentAdventure.errors as error}
          <p class="text-rose-800 dark:text-rose-400">
            {@html error}
          </p>
        {/each}

        <p class="mt-4">
          Check the <strong>⚙️ Settings</strong> and make sure you've entered everything right.
          <br />
          After that we can try this again.
        </p>
      </div>

      <div class="my-8">
        <Button big={true} action={startNewAdventure}>START ADVENTURE</Button>
      </div>
    </div>
  {:else}
    <Adventure />
  {/if}
</main>

<style lang="postcss">
  main {
    @apply p-2 flex-1 flex flex-col flex-nowrap gap-2 relative;
    @apply overflow-visible sm:overflow-hidden;
    @apply bg-neutral-50 dark:bg-neutral-900;
  }

  .infobox {
    @apply flex flex-col items-center text-center overflow-auto;
  }
  .infobox img {
    @apply my-8;
  }

  /* helper for finding the "settings" menu */
  @keyframes bounce {
    0% {
      top: -2rem;
    }
    100% {
      top: -1rem;
    }
  }
  .arrow-taunt {
    font-family: monospace;
    position: absolute;
    z-index: 10;
    top: 0;
    right: 0.3rem;
    font-size: 96px;
    color: theme("colors.amber.500");
    opacity: 0.7;
    animation: bounce 1s ease-in-out infinite alternate;
  }
  @media screen(sm) {
    .arrow-taunt {
      right: 2rem;
    }
  }
</style>
