import { OpenAIApi, Configuration } from "openai";
import { settings } from "$lib/utils/settings";

const configSkeleton = {
  // can add params for OpenAI configuration here
};

const GPT_MODEL = "gpt-3.5-turbo";

let apiKey = "";
let temperature = 70;
settings.subscribe((s) => {
  apiKey = s.GPTKey;
  temperature = s.GPTTemperature / 100;
});

let openai = null;

export async function getNextChat(messages) {
  try {
    if (!openai) throw new Error("API is not initialized properly");

    // send request:
    const conversation = await openai.createChatCompletion({
      model: GPT_MODEL,
      temperature: temperature,
      messages: messages.map((msg) => msg.getContent()),
      /* 
        openai-node does not support streaming yet
        https://github.com/openai/openai-node#streaming-completions

      stream: true, */
    });

    return conversation;
  } catch (e) {
    if (e.response) {
      console.error(
        "OpenAI API: failed to generate conversation message",
        e.response.status,
        e.response.data
      );
      throw e.response.data;
    } else {
      console.error("OpenAI API: request error", e);
      throw e;
    }
  }
}

export async function init() {
  try {
    const config = new Configuration(
      Object.assign(
        {
          apiKey: apiKey,
        },
        configSkeleton
      )
    );

    openai = new OpenAIApi(config);

    // send test request:
    return await openai.listModels();
  } catch (e) {
    if (e.response) {
      console.error("OpenAI API: test request failed", e.response.status, e.response.data);
      throw e.response.data;
    } else {
      console.error("OpenAI API: init failed", e);
      throw e;
    }
  }
}
