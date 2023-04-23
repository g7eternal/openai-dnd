<script>
  import tippy from "$lib/utils/tippy.js";
  import { nullFunction } from "$lib/utils/consts.js";
  import { settings, toggleDarkMode } from "$lib/utils/settings.js";
  import currentAdventure from "$lib/utils/journey";
  import BaseDialog from "./BaseDialog.svelte";

  export let callback = nullFunction;
</script>

<BaseDialog {callback}>
  <span slot="header">
    <strong>⚙️</strong> Settings
  </span>

  <div slot="content">
    <h2 class="text-lg font-bold">Connection</h2>

    <div class="input-group input-col">
      <label for="option_GPTKey">
        <img alt="OpenAI" src="svg/openai.svg" width="20" height="20" />
        OpenAI API key:
      </label>
      <input
        id="option_GPTKey"
        name={Math.random()}
        type="password"
        bind:value={$settings.GPTKey}
        required
        pattern="[\w\-]+"
        autocomplete="new-password"
        disabled={$currentAdventure?.blockSettings}
      />
      <p class="prose dark:prose-dark">
        Please visit your
        <a href="https://platform.openai.com/account/api-keys" target="_blank" noreferrer>
          OpenAI account
        </a>
        page to generate a key.
        <br />
        The key will be stored on this device, and used only during your adventures.
      </p>
    </div>

    <div class="input-group input-col">
      <label for="option_channel">
        <img alt="Twitch" src="svg/twitch.svg" width="20" height="20" />
        Twitch channel name:
      </label>
      <input
        id="option_channel"
        name={Math.random()}
        type="text"
        bind:value={$settings.channel}
        required
        pattern="\w+"
        autocomplete="off"
        disabled={$currentAdventure?.blockSettings}
      />
      <p class="prose">The game will connect to this channel's chat.</p>
    </div>

    <h2 class="text-lg font-bold">Other settings</h2>

    <div class="input-group input-col">
      <label
        for="option_gptTemp"
        class="self-start"
        use:tippy={{
          placement: "top-start",
          content:
            "Higher values might yield more creative responses by deviating from requested prompt",
        }}>🌡️ Model temperature</label
      >
      <div class="flex">
        <input
          id="option_gptTemp"
          class="flex-1 saturate-0"
          type="range"
          min="0"
          max="100"
          step="1"
          bind:value={$settings.GPTTemperature}
        />
        <span class="ms-2 opacity-50">
          {$settings.GPTTemperature}%
        </span>
      </div>
    </div>

    <div class="input-group input-row">
      <span
        use:tippy={{
          placement: "bottom-start",
          content: "Toggles color theme for this webpage",
        }}
      >
        <input
          id="option_darkMode"
          type="checkbox"
          class="toggler"
          bind:checked={$settings.darkMode}
          on:change={() => toggleDarkMode($settings.darkMode)}
        />
        <label for="option_darkMode">💡 Dark mode</label>
      </span>
    </div>

    <div class="input-group input-row">
      <span
        use:tippy={{
          placement: "bottom-start",
          content:
            "Enables a Twitch embed with chat<br><small>Does not work on smaller screens</small>",
        }}
      >
        <input
          id="option_showChat"
          type="checkbox"
          class="toggler"
          bind:checked={$settings.showChat}
        />
        <label for="option_showChat">📜 Show chat during journey</label>
      </span>
      <i class="w-full ml-10 text-xsm sm:hidden">ℹ️ Option has no effect on small screens</i>
    </div>

    <div class="input-group input-row">
      <span
        use:tippy={{
          placement: "bottom-start",
          content: "Longer chat messages will be filtered out before sending logs into GPT",
        }}
      >
        <input
          id="option_ignoreLongMsg"
          type="checkbox"
          class="toggler"
          bind:checked={$settings.ignoreLongMessages}
        />
        <label for="option_ignoreLongMsg">🪢 Ignore long messages</label>
      </span>
    </div>
  </div>
</BaseDialog>

<style lang="postcss">
  .input-group {
    @apply flex my-4;
  }
  .input-col {
    @apply flex-col flex-nowrap items-stretch;
  }
  .input-row {
    @apply flex-row flex-wrap items-center;
  }

  .toggler {
    @apply mr-2 cursor-pointer;
  }

  p.prose {
    margin-top: 4px;
    font-size: 80%;
    line-height: 1rem;
  }

  input[type="text"],
  input[type="password"] {
    @apply rounded-lg border-2 border-gray-400 ring-amber-400  outline-amber-400 text-black bg-white;
  }
  input[type="text"]:invalid,
  input[type="password"]:invalid {
    @apply bg-red-100 outline outline-1 outline-red-500;
  }
  input[type="text"]:disabled,
  input[type="password"]:disabled {
    @apply bg-neutral-300 text-neutral-500;
  }

  label img {
    @apply inline;
  }
  .input-col label {
    @apply mb-2;
  }
</style>
