import { Component } from "react";
import Blockly from "blockly";
import DarkTheme from "@blockly/theme-dark";
import LightTheme from "@blockly/theme-modern";
import "./S4D/blocks/database";
import "./S4D/blocks/discord";
import "./S4D/blocks/loops";
import "./S4D/blocks/other";
import "./S4D/blocks/text";
import { applyBlocklyLocale } from "./S4D/locales/en";
import Toolbox from "./S4D/toolbox";
import { stripIndents } from "common-tags";

export default class App extends Component {
    constructor(...props) {
        super(...props);

        this.workspace = null;
        this.workspacePath = "global";
    }

    componentWillUnmount() {
        // if (this.workspace?.getAllBlocks().length) {
        //     const xml = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(this.workspace));
        //     localStorage.setItem(`workspace_${this.workspacePath || "global"}`, xml);
        // }
    }

    restoreBlocks() {
        // const workspaceBlocks = localStorage.getItem(`workspace_${this.workspacePath || "global"}`);
        // if (workspaceBlocks) {
        //     const confirmed = confirm("Blocks found from previous session, do you want to load them?");
        //     if (!confirmed) return localStorage.removeItem(`workspace_${this.workspacePath || "global"}`);
        //     this.workspace.getAllBlocks().forEach((b) => (!b.disposed ? b.dispose() : null));
        //     Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(workspaceBlocks), this.workspace);
        // }
    }

    componentDidMount() {
        applyBlocklyLocale();
        this.workspace = Blockly.inject(this.editorDiv, {
            theme: window.localStorage.getItem("theme") === "dark" ? DarkTheme : LightTheme,
            renderer: "zelos",
            grid: {
                spacing: 25,
                length: 3,
                colour: "#CCCCCC",
                snap: true
            },
            zoom: {
                controls: true,
                startScale: 0.9,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2
            },
            toolbox: Toolbox(Blockly)
        });

        setTimeout(() => {
            this.restoreBlocks();
        }, 1000);
    }

    render() {
        return <div ref={(e) => (this.editorDiv = e)} className="w-full h-screen"></div>;
    }

    generateCode() {
        return stripIndents`
                const Discord = require("discord.js");
                const Database = require("easy-json-database");
                const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
                const s4d = {
                    Discord,
                    database: new Database(\`./db.json\`),
                    joiningMember:null,
                    reply:null,
                    tokenInvalid:false,
                    tokenError: null,
                    checkMessageExists() {
                        if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
                        if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
                    }
                };
                s4d.client = new s4d.Discord.Client({
                    intents: [Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)],
                    partials: ["REACTION"]
                });

                ${this.workspace ? Blockly.JavaScript.workspaceToCode(this.workspace) : ""}
            `;
    }
}
