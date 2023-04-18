<script>
  import { settings } from "$lib/utils/settings.js";
  import currentAdventure from "$lib/utils/journey.js";

  import ChatBlock from "$lib/elements/chat/ChatBlock.svelte";
  import EmbedChatBlock from "$lib/elements/chat/EmbedChatBlock.svelte";
  import LoadingSpinner from "$lib/elements/LoadingSpinner.svelte";
  import InputBar from "../elements/conversation/InputBar.svelte";
  import Conversation from "../elements/conversation/Conversation.svelte";
  import FirstPrompt from "../elements/conversation/FirstPrompt.svelte";
</script>

<div class="main">
  {#if $currentAdventure.ready}
    {#if $settings.showChat}
      <aside>
        <EmbedChatBlock />
        <!--<ChatBlock />-->
      </aside>
    {/if}
    <section>
      <div class="content">
        {#if $currentAdventure.conversation.length > 0}
          <Conversation />
        {:else}
          <FirstPrompt />
        {/if}
      </div>
      <InputBar />
    </section>
  {:else}
    <div class="w-full flex flex-col items-center">
      <LoadingSpinner />
      <div class="flex-1 text-2xl text-center">
        {$currentAdventure.readyState || "Almost there..."}
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  .main {
    @apply w-full h-full flex flex-row flex-nowrap gap-2 overflow-hidden;
  }

  aside {
    @apply hidden sm:flex;
    @apply flex-grow-0 w-1/3 h-full flex-col flex-nowrap gap-2 overflow-hidden;
  }

  section {
    @apply flex-1 h-full flex flex-col flex-nowrap;
  }

  .content {
    @apply px-1 flex-1;
    @apply overflow-visible sm:overflow-auto;
  }
</style>
