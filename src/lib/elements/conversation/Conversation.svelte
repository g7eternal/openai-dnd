<script>
  import currentAdventure from "$lib/utils/journey.js";

  import ChatBubble from "./ChatBubble.svelte";
</script>

<div class="flex flex-col justify-end min-h-full">
  <div class="mb-auto opacity-40 text-center text-sm my-2">This is your adventure log.</div>
  {#each $currentAdventure.conversation as message, index (message.id)}
    <ChatBubble
      isOwn={message.sender === "user"}
      isError={message.isError}
      isLast={index === $currentAdventure.conversation.length - 1}
    >
      <p>{@html message.text}</p>
    </ChatBubble>
  {/each}
</div>
