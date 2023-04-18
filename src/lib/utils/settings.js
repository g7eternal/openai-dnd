import { browser } from "$app/environment";
import { writable } from "svelte/store";

const lsKey = "openai-dnd:settings";

const defaultSettings = {
  darkMode: false,
  showChat: true,
  ignoreLongMessages: true,
  appendLogs: true,
  channel: "",
  GPTKey: "",
  lastVisit: new Date(0),
};

export const settings = writable(Object.assign({}, defaultSettings));
export const appReady = writable(false);

if (browser) {
  // only browser env has localStorage
  try {
    let parsedSettings = null;
    const storedSettings = localStorage.getItem(lsKey);

    if (storedSettings) {
      parsedSettings = JSON.parse(storedSettings);
    }

    settings.update((s) => {
      for (let key in parsedSettings) {
        if (key in defaultSettings) s[key] = parsedSettings[key];
        if (defaultSettings[key] instanceof Date) {
          s[key] = new Date(s[key]);
        }
      }

      return s;
    });
  } catch (e) {
    console.warn("Failed to restore settings from localStorage", e);
  } finally {
    // subscribe an auto-saver
    settings.subscribe((s) => {
      localStorage.setItem(lsKey, JSON.stringify(s));
    });

    settings.update((s) => {
      if (s.lastVisit.getTime() === 0) {
        // first visit - autodetect some options
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
          toggleDarkMode(true);
        }
      } else {
        // apply settings:
        toggleDarkMode(s.darkMode);
      }

      // reset last visit date
      s.lastVisit = new Date();

      // set ready flag to True as we finished parsing settings
      appReady.set(true);

      return s;
    });
  }
}

export function toggleDarkMode(newState) {
  settings.update((s) => {
    if (newState === undefined) newState = !s.darkMode;
    s.darkMode = newState;
    document.documentElement.classList.toggle("dark", s.darkMode);
    return s;
  });
}
