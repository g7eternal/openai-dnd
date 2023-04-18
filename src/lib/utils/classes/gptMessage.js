export default class GPTMessage {
  constructor(text) {
    this.content = text;
    this.role = "user";
  }

  setRole(role) {
    this.role = role;
    return this;
  }
}
