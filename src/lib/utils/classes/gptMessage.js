import { gptPrompts } from "$lib/utils/journey";

export default class GPTMessage {
  constructor(text) {
    this.content = text;
    this.role = "user";

    this.chatLogs = [];
    this.chatLogsUsed = false;
  }

  setRole(role) {
    this.role = role;
    return this;
  }

  setChatLogs(logs) {
    if (logs?.length < 1) return;

    this.chatLogsUsed = false;
    this.chatLogs = logs;

    return this;
  }

  getContent() {
    const gptContent = {
      content: this.content,
      role: this.role,
    };

    if (!this.chatLogsUsed) {
      gptContent.content += "\n" + gptPrompts.system.logsIntro + "\n";
      gptContent.content += this.chatLogs.join("\n");

      this.chatLogsUsed = true;
      //delete this.chatLogs;
    }

    return gptContent;
  }
}
