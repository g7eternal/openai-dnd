<script>
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";

  export let isError = false; // contains error text
  export let isLast = false; // adds callout tip in css
  export let isOwn = false; // own = from user, not own = from gpt

  const transitionConfig = {
    duration: 150,
    y: 50,
  };

  // new messages must scroll into view
  let root = null;
  onMount(() => {
    root?.scrollIntoView({ behavior: "smooth" });
  });
</script>

<div
  bind:this={root}
  class="prose bubble"
  class:last={isLast}
  class:own={isOwn}
  class:error={isError}
  in:fly={transitionConfig}
>
  <slot />
</div>

<style lang="postcss">
  .bubble {
    @apply relative my-2 p-2 rounded-md border-2;
    @apply bg-zinc-200 text-zinc-800 border-gray-500;
    @apply dark:bg-zinc-800 dark:text-zinc-200;
    line-height: 1.5rem;
    max-width: 80%;
    max-width: min(80%, 65ch);
  }
  .error {
    @apply text-red-700 dark:text-red-500 italic;
  }
  .own {
    @apply bg-yellow-200 dark:bg-yellow-900 self-end;
  }
  .last {
    @apply mb-3;
  }
  .last::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    margin-left: -0.5rem;
    bottom: -1rem;
    left: 2rem;
    box-sizing: border-box;
    border: 0.5em solid #000;
    border-color: transparent transparent theme("colors.gray.500") theme("colors.gray.500");
    transform-origin: 0 0;
    transform: rotate(-45deg);
    box-shadow: -3px 3px 4px 0 rgba(0, 0, 0, 0.08);
  }
  .last.own::after {
    left: unset;
    right: 2rem;
  }
</style>
