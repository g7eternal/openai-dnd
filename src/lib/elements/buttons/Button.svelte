<script>
  import { nullFunction } from "$lib/utils/consts.js";

  export let action = nullFunction;
  export let big = false;
</script>

<button class:big on:click={action}>
  <slot />
</button>

<style lang="postcss">
  button {
    @apply px-2 m-0 rounded transition-colors;
    @apply text-black dark:text-black;
    @apply bg-amber-300 hover:bg-amber-400;
    @apply border border-amber-800;
    @apply focus:outline-none focus:ring focus:ring-orange-300;
  }

  button.big {
    @apply text-2xl px-8 py-2;
  }

  @media all and (max-width: 250px) {
    button.big {
      @apply px-1;
    }
  }
</style>
