<script>
  export let inline = false;
</script>

<img src="svg/loading.svg" alt="Loading..." width="100" height="100" class:inline />

<style lang="postcss">
  img {
    @apply m-auto w-3/4 h-3/4;
  }

  img.inline {
    @apply m-0 w-4 h-4 align-baseline;
  }
</style>
