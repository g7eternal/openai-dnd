import { logs, initialize as initTMI } from "$lib/utils/chat";
import RichMessage from "./richMessage";
import GPTMessage from "./gptMessage";
import { init as initOpenAI, getNextChat } from "$lib/utils/openai";
import { triggerAdventureUpdate, gptPrompts } from "$lib/utils/journey";
import { escapeHTML } from "$lib/utils/common";

export default class Adventure {
  constructor() {
    this.ready = false;
    this.readyState = "";
    this.requested = false;
    this.blockSettings = false; // prevents key manipulation during adventure
    this.errors = [];

    // init some stuff
    this.conversation = new Array(); // is shown to user
    this.history = new Array(); // is sent to ChatGPT

    this.initialize();
  }

  async initialize() {
    this.blockSettings = true;

    // first do basic checks before we begin:

    // test if strings are loaded
    this.readyState = "Verifying resources...";
    this.triggerUpdate();
    if (gptPrompts._error) {
      const errorText = gptPrompts._error.message || String(gptPrompts._error);
      this.errors.push(`<i>Journey strings missing:</i> ${escapeHTML(errorText)}`);
    }

    // test if twitch chat is available
    this.readyState = "Connecting to Twitch chat...";
    this.triggerUpdate();
    try {
      await initTMI();
    } catch (e) {
      const errorText = e.message || e.text || String(e);
      this.errors.push(`<i>Chat error:</i> ${escapeHTML(errorText)}`);
    }

    // test if openai api is available
    this.readyState = "Connecting to OpenAI services...";
    this.triggerUpdate();
    try {
      await initOpenAI();
    } catch (e) {
      // for some reason, openai returns api key in e.error.message
      // this is strange. therefore let's use e.error.code instead
      const errorText = e?.error ? e.error.code : String(e);
      this.errors.push(`<i>ChatGPT error:</i> ${escapeHTML(errorText)}`);
    }

    // if any errors - discontinue
    this.readyState = "";
    if (this.errors.length > 0) {
      this.blockSettings = false;
      return this.triggerUpdate();
    }

    // we gucci, tamagucci
    this.ready = true;
    logs.length = 0; // clear chat logs before a new adventure
    return this.triggerUpdate();
  }

  triggerUpdate() {
    triggerAdventureUpdate();
    return this;
  }

  getParsedLogs() {
    const logChunk = logs.splice(0, logs.length).map((entry) => {
      return `${entry.sender}: ${entry.text}`;
    });

    return logChunk;
  }

  async requestGeneration() {
    try {
      const data = await getNextChat(this.history);
      const messageData = data.data.choices.pop();
      const response = messageData.message;

      let text = escapeHTML(response.content);
      text = text.replace(/\r?\n/g, "<br>");

      const convoMsg = new RichMessage(text);
      convoMsg.setAuthor(response.role);
      this.conversation.push(convoMsg);

      const gptMsg = new GPTMessage(response.content);
      gptMsg.setRole(response.role);
      this.history.push(gptMsg);
    } catch (e) {
      console.warn("ChatGPT: first message generation failed", e);
      const errorText = e?.error ? e.error.message : String(e);

      const errorConvoMsg = new RichMessage(errorText);
      errorConvoMsg.setAuthor("assistant").markAsErroneous();
      this.conversation.push(errorConvoMsg);

      const errorMsg = new GPTMessage(errorText);
      errorMsg.setRole("assistant");
      this.history.push(errorMsg);
    }

    this.requested = false;
    return this;
  }

  setGptRole(journeyDescription) {
    const premise = gptPrompts.system.journeyTopic + "\n" + journeyDescription;

    const convoMessage = new RichMessage(premise);
    convoMessage.setAuthor("user");
    this.conversation.push(convoMessage);

    const elements = [gptPrompts.system.roleIntro, "", premise];
    const message = new GPTMessage(elements.join("\n").trim());
    message.setRole("system");
    this.history.push(message);

    return this;
  }

  async generateFirstPrompt() {
    const convoMessage = new RichMessage(gptPrompts.journey.starter);
    convoMessage.setAuthor("user");
    this.conversation.push(convoMessage);

    const elements = [
      gptPrompts.journey.starter,
      "",
      gptPrompts.journey.starter2,
      "",
      gptPrompts.system.logsIntro,
      "",
    ].concat(this.getParsedLogs()); // grabs all messages

    const msg = new GPTMessage(elements.join("\n"));
    this.history.push(msg);
    this.requested = true;
    this.triggerUpdate();

    await this.requestGeneration();
    return this.triggerUpdate();
  }

  async generateNextPrompt(text, withLogs = true) {
    if (!text) throw new Error("Argument 'text' cannot be empty");

    const convoMessage = new RichMessage(text);
    convoMessage.setAuthor("user");
    this.conversation.push(convoMessage);
    this.requested = true;
    this.triggerUpdate();

    let elements = [text, ""];
    if (withLogs) {
      elements.push(gptPrompts.system.logsIntro + "\n");
      elements = elements.concat(this.getParsedLogs());
    }

    const msg = new GPTMessage(elements.join("\n"));
    this.history.push(msg);

    await this.requestGeneration();
    return this.triggerUpdate();
  }

  destroy() {
    this.ready = false;
    this.blockSettings = false;
    //this.errors.push("This adventure has ended.");

    return this.triggerUpdate();
  }
}
