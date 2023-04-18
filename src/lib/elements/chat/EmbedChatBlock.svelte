<script>
  import { browser, dev } from "$app/environment";
  import { settings } from "$lib/utils/settings.js";
</script>

<div class="chat-block">
  <div class="placeholder">
    <!-- is visible only without iframe -->
    <img src="svg/twitch.svg" width="64" height="64" alt="Twitch logo" />
    <p class="text-center">
      {#if dev}
        Twitch chat block <br />
        <small>(disabled in dev mode)</small>
      {:else}
        Loading Twitch chat...
      {/if}
    </p>
  </div>

  {#if browser && !dev && $settings.showChat}
    <!-- is not visible when running dev build (:5173) -->
    <iframe
      src={`https://www.twitch.tv/embed/${$settings.channel}/chat?parent=${window.location.hostname}`}
      height="100%"
      width="100%"
      title="Twitch chat"
      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-modals"
    />
  {/if}
</div>

<style lang="postcss">
  .chat-block {
    @apply w-full h-full flex-1 relative rounded;
  }

  .placeholder {
    @apply w-full h-full flex flex-col items-center justify-center rounded;
    border: 1px solid rgba(128, 128, 128, 0.3);
  }

  iframe {
    @apply absolute top-0 left-0 rounded;
  }
</style>
