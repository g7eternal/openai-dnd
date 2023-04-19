<script>
  import ToolBar from "./ToolBar.svelte";
</script>

<nav>
  <!-- Site logo and name (left side) -->
  <div class="brand">
    <img src="favicon.png" alt="" />
    <h1>
      <a href=".">GPT AutoAdventures</a>
    </h1>
  </div>

  <!-- Splitter -->
  <div class="flex-1" />

  <!-- Right-hand site buttons to log in or change options -->
  <div>
    <ToolBar />
  </div>
</nav>

<style lang="postcss">
  nav {
    @apply p-2 flex-grow-0 flex flex-row flex-nowrap border-b;
    @apply border-b-zinc-700 bg-zinc-300;
    @apply dark:border-b-zinc-700 dark:bg-zinc-800;
  }

  .brand {
    @apply inline;
  }
  .brand img {
    @apply inline w-7 h-7;
  }
  .brand h1 {
    @apply inline text-xl align-bottom;
  }
</style>
