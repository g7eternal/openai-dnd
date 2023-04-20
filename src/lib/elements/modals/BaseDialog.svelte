<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { nullFunction } from "$lib/utils/consts.js";
  import tippy from "$lib/utils/tippy.js";

  export let callback = nullFunction; // is fired when modal is closed

  const closerTippyConfig = {
    content: "Close",
    placement: "left",
    offset: [0, 4],
    trigger: "mouseenter",
  };

  let dialogRef;

  onMount(() => {
    try {
      if (!dialogRef) throw new Error("Empty dialog reference"); // shouldn't happen because of "bind:this"

      dialogRef.addEventListener("close", callback);
      dialogRef.showModal();
    } catch (e) {
      console.error("Modal mount error", e);
    } finally {
      return () => {
        dialogRef?.close();
      };
    }
  });
</script>

<dialog bind:this={dialogRef} in:fly={{ duration: 200, y: 50 }}>
  <form method="dialog">
    <header>
      <h1>
        <slot name="header" />
      </h1>

      <button class="closer" use:tippy={closerTippyConfig}>
        <img src="svg/close-button.svg" alt="✖️" width="24" height="24" />
      </button>
    </header>

    <div class="content">
      <slot name="content" />
    </div>
  </form>
</dialog>

<style lang="postcss">
  dialog {
    @apply md:rounded-xl border-2 border-amber-500;
    @apply bg-zinc-100 text-zinc-800;
    @apply dark:bg-zinc-800 dark:text-zinc-100;
  }
  dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    cursor: not-allowed; /* this looks goofy */
  }

  form {
    @apply h-full w-full m-0 flex flex-col flex-nowrap;
  }

  header {
    @apply flex-grow-0 flex flex-row flex-nowrap mb-4;
  }
  header h1 {
    @apply flex-1 text-2xl;
  }

  .closer {
    @apply h-auto align-top text-red-700;
    text-shadow: none;
    filter: none;
    transition: text-shadow 0.2s ease, filter 0.2s ease;
  }
  .closer:hover {
    filter: contrast(1.5);
    text-shadow: 0px 0px 4px theme("colors.gray.400");
  }

  .content {
    @apply flex-1 px-2 overflow-auto;
  }
</style>
