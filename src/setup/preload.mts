import {contextBridge, ipcRenderer} from "electron";
import {injectTitlebar} from "../discord/preload/titlebar.mjs";
import {Settings} from "../@types/settings.js";

injectTitlebar();

export const restart = () => ipcRenderer.send("setup-restart");
export const getOS = () => ipcRenderer.sendSync("setup-getOS") as string;
export const saveSettings = (...args: [Settings]) => ipcRenderer.send("setup-saveSettings", ...args);
export const getLang = async (toGet: string) =>
    await ipcRenderer.invoke("setup-getLang", toGet).then((result: string) => {
        return result;
    });

contextBridge.exposeInMainWorld("armcordinternal", {
    restart,
    getOS,
    saveSettings,
    getLang
});
