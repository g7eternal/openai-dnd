<script>
  import { nullFunction } from "$lib/utils/consts.js";
  import BaseDialog from "./BaseDialog.svelte";

  export let callback = nullFunction;
</script>

<BaseDialog {callback}>
  <span slot="header">
    <strong>❔</strong> About this page
  </span>

  <div slot="content" class="prose max-w-none flex-1 overflow-auto">
    <p>
      This page offers a way to play AI-generated text-based games which would include real-time
      Twitch chat messages. Chat interaction becomes an important part of these games.
    </p>

    <p>
      Chat messages are sent alongside your prompts into
      <a href="https://chat.openai.com" target="_blank">OpenAI's ChatGPT</a>, and the model is asked
      to analyze the chat logs and make use of whatever is being sent.
    </p>

    <p>
      You will need to provide your own OpenAI API key, since there is no other way to authorize
      yet. Additionally, you have to specify a Twitch channel's name to read the chat from.
    </p>

    <p>
      The source code for this application is available at
      <a href="https://github.com/g7eternal/openai-dnd" target="_blank">GitHub</a>.
      <br />
      If you have encountered an error, or have an idea about how to improve this page - visit
      <a href="https://github.com/g7eternal/openai-dnd/issues" target="_blank">Issues</a> section of
      the repo to create a ticket.
    </p>

    <p class="text-sm text-gray-500">
      App designed by
      <a href="https://g7eternal.com/" target="_blank" class="owner">G7Eternal</a>
    </p>
  </div>
</BaseDialog>

<style lang="postcss">
  .owner {
    @apply text-green-700 dark:text-green-300 no-underline;
  }
</style>
