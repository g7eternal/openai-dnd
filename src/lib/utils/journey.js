import { browser } from "$app/environment";
import { writable } from "svelte/store";
import Adventure from "./classes/adventure";

// contains strings for use in GPT conversation
export const gptPrompts = { _error: null };
if (browser) {
  fetch("data/journey-strings.json")
    .then((r) => r.json())
    .then((data) => {
      for (const key in data) {
        gptPrompts[key] = data[key];
      }
      delete gptPrompts._error;
    })
    .catch((e) => {
      console.error("Failed to fetch a list of journey strings", e);
      gptPrompts._error = e;
    })
    .then(() => {
      Object.freeze(gptPrompts); // prevents accidental overwrites
    });
}

const currentAdventure = writable(null);
export default currentAdventure;

export function startNewAdventure() {
  currentAdventure.update((a) => {
    // destroy previous instance
    if (a) {
      a.destroy();
    }

    // and create a new one
    return new Adventure();
  });

  return currentAdventure;
}

export function triggerAdventureUpdate() {
  // useful to re-render DOM after updating adventure's fields
  currentAdventure.update((x) => x);
}
