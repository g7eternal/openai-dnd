<script>
  import { startNewAdventure } from "$lib/utils/journey";
  import BaseDialog from "./BaseDialog.svelte";

  export let callback;
</script>

<BaseDialog {callback}>
  <b slot="header"> Start new journey </b>

  <div slot="content" class="prose">
    <p>Are you sure you want to end current adventure and start a new one?</p>
    <div class="buttons">
      <button class="positive" on:click={startNewAdventure}>✔️ Yes</button>
      <button class="negative">✖️ No</button>
    </div>
  </div>
</BaseDialog>

<style lang="postcss">
  .prose {
    @apply h-full w-full max-w-none flex flex-col flex-nowrap;
  }
  .prose p {
    @apply m-auto text-center;
  }
  .buttons {
    @apply flex flex-row justify-around;
  }
  button {
    @apply rounded w-1/3 h-12 border border-gray-500 cursor-pointer transition-all;
  }
  button.positive {
    @apply bg-green-300 dark:bg-green-950;
  }
  button.negative {
    @apply bg-red-300 dark:bg-red-950;
  }
  button:hover {
    filter: saturate(2);
  }
</style>
