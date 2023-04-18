<script>
  import { settings } from "$lib/utils/settings";
  import { escapeHTML } from "$lib/utils/common";
  import { logStatus, logs } from "$lib/utils/chat";
  import currentAdventure from "$lib/utils/journey";
  import tippy from "$lib/utils/tippy";

  import Button from "../buttons/Button.svelte";
  import LoadingSpinner from "../LoadingSpinner.svelte";

  let prompt = "";

  async function sendPrompt() {
    if ($currentAdventure.requested) return;
    $currentAdventure.requested = true;

    const text = escapeHTML(prompt);

    if ($currentAdventure.conversation.length > 0) {
      // conversation continues
      await $currentAdventure.generateNextPrompt(text, $settings.appendLogs);
    } else {
      // first message
      await $currentAdventure.setGptRole(prompt, $settings.appendLogs);
      await $currentAdventure.generateFirstPrompt(text, $settings.appendLogs);
    }

    // clean up and prepare to continue
    logs.length = 0;
    prompt = "";
  }

  function ctrlEnter(event) {
    if ((event.keyCode == 10 || event.keyCode == 13) && event.ctrlKey) {
      event.preventDefault();
      sendPrompt();
    }
  }

  const placeholder =
    "Enter your prompt here\n\nUse [Enter] for line breaks, and [Ctrl+Enter] to submit";
</script>

<div class="main">
  <div class="portrait-container">
    <img src="img/donk-shaman.webp" alt="Dungeon Master" width="128" height="128" />
  </div>
  <div class="textarea-container">
    {#if $currentAdventure.requested}
      <div class="w-full h-full flex flex-col text-center">
        <LoadingSpinner />
        <strong>🤔💭 Thinking...</strong>
      </div>
    {:else}
      <textarea bind:value={prompt} {placeholder} on:keypress={ctrlEnter} />

      <div class="button-container">
        <div class="flex-1">
          <div>
            <input
              type="checkbox"
              class="toggler"
              bind:checked={$settings.appendLogs}
              id="gpt_appendLogs"
            />
            <label for="gpt_appendLogs"> Add recent chat messages to the prompt </label>
          </div>
          <div class="text-xsm">
            Message log count:
            <strong class="text-amber-500">{$logStatus}</strong>
          </div>
        </div>
        <div class="flex-grow-0 flex h-full">
          <div class="m-auto" use:tippy={{ content: "Send prompt" }}>
            <Button action={sendPrompt}>Send ►</Button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="postcss">
  .main {
    @apply p-2 flex-grow-0 flex flex-row flex-nowrap gap-2;
    @apply h-60 sm:h-40;
  }

  .portrait-container {
    @apply flex-grow-0 h-full p-0;
    @apply hidden md:flex;
  }
  .portrait-container img {
    @apply h-full w-auto;
  }

  .textarea-container {
    @apply flex-1 flex flex-col;
  }
  textarea {
    @apply w-full h-2/3 rounded resize-none;
  }

  .button-container {
    @apply flex-grow-0 flex flex-row;
  }
  .toggler {
    transform: translateY(-0.1rem);
  }
</style>
