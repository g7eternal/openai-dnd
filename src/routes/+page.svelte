<script>
  import { appReady } from "$lib/utils/settings";
  import LoadingSpinner from "$lib/elements/LoadingSpinner.svelte";
  import NavBar from "$lib/sections/NavBar.svelte";
  import Main from "$lib/sections/Main.svelte";
</script>

<svelte:head>
  <title>ChatGPT Adventures</title>
</svelte:head>

<div class="app">
  {#if $appReady}
    <NavBar />
    <Main />
  {:else}
    <div class="banner">
      <div class="banner-item banner-item-big">
        <LoadingSpinner />
      </div>
      <div class="banner-item">Just a moment...</div>
    </div>
  {/if}
</div>

<style lang="postcss">
  .app {
    min-width: 180px;
    @apply w-full h-full flex flex-col flex-nowrap items-stretch;
    @apply bg-zinc-50 text-zinc-900;
    @apply dark:bg-zinc-900 dark:text-zinc-50;
  }

  .banner {
    @apply w-full h-full p-8 flex flex-col flex-nowrap items-center text-center text-xl;
  }
  .banner-item {
    @apply flex-1 flex flex-col items-center;
  }
  .banner-item-big {
    flex-grow: 4;
  }
</style>
