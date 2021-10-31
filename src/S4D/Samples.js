import { stripIndents } from "common-tags";

export const PackageFile = JSON.stringify({
    name: "@scratch-for-discord/example",
    version: "1.0.0",
    description: "Discord bot created with Scratch For Discord",
    main: "index.js",
    scripts: {
        start: "node index.js"
    },
    author: "Scratch For Discord",
    license: "MIT",
    dependencies: {
        "discord.js": "^13.2.0",
        "easy-json-database": "^1.5.0"
    },
    engines: {
        node: ">=16.x"
    }
});

export const ReadmeFile = stripIndents`
# Scratch For Discord

This is a production build of your bot created with Scratch For Discord.

## Run the bot

### Install

\`\`\`sh
$ npm install
\`\`\`

### Run

\`\`\`sh
$ npm start
\`\`\`
`;
