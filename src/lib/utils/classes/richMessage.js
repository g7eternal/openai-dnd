let idGenerator = 0;

function generateId() {
  return idGenerator++;
}

export default class RichMessage {
  constructor(text = "") {
    this.id = generateId();
    this.isError = false;

    this.setText(text);
  }

  setAuthor(senderName, senderColor) {
    this.sender = senderName;
    this.displayName = senderName;

    if (senderColor) {
      this.usercolor = senderColor;
    } else delete this.usercolor;

    return this;
  }

  setText(text) {
    this.text = text;

    return this;
  }

  hydrateWithTags(tags) {
    // twitch irc tags parser
    this.setAuthor(tags.username, tags.color);
    this.displayName = tags["display-name"] || tags.username;

    return this;
  }

  markAsErroneous(flag = true) {
    this.isError = flag;
    return this;
  }
}
