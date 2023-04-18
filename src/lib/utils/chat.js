import tmi from "tmi.js";
import { writable } from "svelte/store";
import { settings } from "./settings.js";
import RichMessage from "./classes/richMessage.js";

const CHAT_LOG_LIMIT = 100,
  CHAT_SPLICE_PORTION = 30;
const LONG_MESSAGE_LIMIT = 69;

const localChatState = {
  channel: "",
  busy: true,
  connected: false,
  loaded: false,
  lastError: "",
};
export const chat = writable(localChatState);

export const logs = new Array();
export const logStatus = writable(0); // wrapper for reactivity

let channel = "",
  ignoreLongMessages = true;
settings.subscribe((s) => {
  channel = s.channel;
  ignoreLongMessages = s.ignoreLongMessages;
});

const client = new tmi.Client({
  // connect options go here
});

client.on("connected", () => {
  // is fired on connection to twitch server
  console.info("<TMI> Connection established!");

  // remove "busy" flag and wait for instructions
  chat.update((c) => {
    c.loaded = true;
    c.busy = false;
    c.connected = false;
    return c;
  });
});

client.on("join", (channel, _username, self) => {
  if (self) console.log(`<TMI> Event: Joined chat room: ${channel}`);
});
client.on("part", (channel, _username, self) => {
  if (self) console.log(`<TMI> Event: Left chat room: ${channel}`);
});

client.on("disconnected", (reason) => {
  console.warn("<TMI> Disconnected. Reason: " + reason);
  leaveChannel().then(initialize);
});

client.on("message", (_channel, tags, message = "") => {
  // forsen's chat is very donk 😠
  if (ignoreLongMessages && message.length > LONG_MESSAGE_LIMIT) return;

  const msg = new RichMessage(message);
  msg.hydrateWithTags(tags);

  logs.push(msg);
  logStatus.set(logs.length);

  // periodically clean up the message history
  if (logs.length > CHAT_LOG_LIMIT) {
    logs.splice(0, CHAT_SPLICE_PORTION);
  }
});

async function joinChannel() {
  let refuseReason = "";
  try {
    if (!channel) {
      refuseReason = "No channel provided";
      return;
    }

    chat.update((c) => {
      if (c.busy) {
        refuseReason = "Client is busy with another operation, try again";
        return c;
      }
      c.channel = channel;
      c.busy = true;
      return c;
    });

    if (refuseReason) return;

    // make join request
    await client.join(channel); // this might fail - hence the "catch"
    chat.update((c) => {
      c.busy = false;
      c.connected = true;
      return c;
    });
    console.info("<TMI> Joined channel: " + channel);
  } catch (e) {
    console.warn("<TMI> Failed to join channel: " + channel, e);
    chat.update((c) => {
      c.busy = false;
      c.connected = false;
      c.lastError = e;
      return c;
    });
    throw e;
  } finally {
    if (refuseReason) console.warn("<TMI> Channel join refused: " + refuseReason);
  }
}

async function leaveChannel(force = false) {
  let refuseReason = "";
  try {
    if (!force && !channel) {
      refuseReason = "No channel name";
      return;
    }

    chat.update((c) => {
      if (c.busy) {
        refuseReason = "Client is busy with another operation, try again";
        return c;
      }
      c.busy = true;
      // c.connected = true; // we actually can't be sure we are connected
      return c;
    });

    if (refuseReason) return;

    // make part request
    if (channel) {
      await client.part(channel);
      console.info("<TMI> Left channel: " + channel);
    }
    chat.update((c) => {
      c.busy = false;
      c.connected = false;
      return c;
    });
  } catch (e) {
    console.warn("<TMI> Failed to leave channel: " + channel, e);
    chat.update((c) => {
      c.busy = false;
      // c.connected = false; // same as above
      c.lastError = e;
      return c;
    });
    throw e;
  } finally {
    if (refuseReason) console.warn("<TMI> Channel leave refused: " + refuseReason);
  }
}

export async function initialize() {
  try {
    if (!localChatState.loaded) await client.connect();
  } catch (e) {
    console.error("<TMI> Init failed", e);
    throw e;
  }
  await joinChannel();
}
