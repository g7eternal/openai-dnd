# OpenAI-DND

A web-application which combines real-time chat logs and the power of GPT to generate endless adventure stories.

[Showcase gallery](https://imgur.com/a/vRF9uNL) | [Live demo](https://g7eternal.com/openai-dnd/)

## Forking a project

If you want a local copy, clone or fork this project, then run `npm install` (or similar command for another package managers) to install dependencies.

## Developing

Once you've got everything installed, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

See the output of this command for further info. Usually the local website will be available at `localhost:5173`.

Now whenever you make changes to the files, these changes are instantly applied to your local website.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

Application builds using "static" adapter: you will get a bunch of static files which you can serve using any provider of your choice. Server-side rendering is disabled in production.
