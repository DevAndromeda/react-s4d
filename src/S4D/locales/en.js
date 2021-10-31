import Blockly from "blockly";
import blocklyMessages from "./en-US.json";

export const applyBlocklyLocale = () => {
    for (let key in blocklyMessages) {
        Blockly.Msg[key] = blocklyMessages[key];
    }
};
