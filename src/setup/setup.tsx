import css from "./setup.module.css";

declare const armcordinternal: typeof import("./preload.mjs");

const next = await armcordinternal.getLang("next");
const setup_offline = await armcordinternal.getLang("setup_offline");
const setup_question1 = await armcordinternal.getLang("setup_question1");
const setup_question1_answer1 = await armcordinternal.getLang("setup_question1_answer1");
const setup_question1_answer2 = await armcordinternal.getLang("setup_question1_answer2"); // full
const setup_question2 = await armcordinternal.getLang("setup_question2");
const setup_question3 = await armcordinternal.getLang("setup_question3");
const setup_question4 = await armcordinternal.getLang("setup_question4");
const setup_question5 = await armcordinternal.getLang("setup_question5");

export default function Setup() {
    document.onload = function () {
        ipcRenderer.send("win-unmaximize");
    };
    // Accessors {{{
    let options = {};

    let logo = document.getElementById("logo");
    logo.classNameList.remove("hidden");

    let page1 = document.getElementById("page1");
    page1.classNameList.remove("hidden");
    page1.buttons = document.querySelectorAll("#page1 > #buttons > button");

    // Connection check
    let warning = document.getElementById("warning");
    if (window.navigator.onLine === false) {
        warning.classNameList.remove("hidden");
    }

    let page2 = document.getElementById("page2");
    let page3 = document.getElementById("page3");
    let page4 = document.getElementById("page4");
    // }}}

    // Full
    page1.buttons[0].addEventListener("click", () => {
        page1.classNameList.add("hidden");
        page2.classNameList.remove("hidden");
    });

    document.getElementById("next-page2").addEventListener("click", () => {
        options.channel = document.getElementById("channel").value;
        page2.classNameList.add("hidden");
        page3.classNameList.remove("hidden");
    });

    document.getElementById("next-page3").addEventListener("click", () => {
        options.mod = document.getElementById("mod").value;
        page3.classNameList.add("hidden");
        page4.classNameList.remove("hidden");
    });

    if (window.armcordinternal.getOS == "linux") {
        document.getElementById("tray").value = "false";
        document.getElementById("linuxNotice").innerHTML =
            `Linux may not work well with tray icons. Depending on your system configuration, you may not be able to see the tray icon. Enable at your own risk. Can be changed later.`;
    }
    if (window.armcordinternal.getOS == "darwin") {
        // macOS doesn't really do tray icons
        document.getElementById("tray").value = "false";
    }
    document.getElementById("next-page4").addEventListener("click", () => {
        window.armcordinternal.saveSettings({
            windowStyle: "default",
            channel: options.channel,
            armcordCSP: true,
            minimizeToTray: true,
            mobileMode: false,
            spellcheck: true,
            skipSplash: false,
            disableAutogain: false,
            mods: options.mod,
            dynamicIcon: false,
            multiInstance: false,
            hardwareAcceleration: true,
            useLegacyCapturer: false,
            tray: /true/i.test(document.getElementById("tray").value),
            startMinimized: false,
            performanceMode: "none",
            trayIcon: "dynamic",
            inviteWebsocket: true,
            doneSetup: true
        });
        setTimeout(() => window.armcordinternal.restart(), 500);
    });
    document.body.setAttribute("insetup", "");
    return (
        <>
            <head>
                <meta charSet="UTF-8" />
                <link rel="icon" type="image/ico" href="./favicon.ico" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>ArmCord Setup</title>
            </head>

            <body>
                <div className="container">
                    <div id="warning" className="hidden">
                        <p id="setup_offline">{setup_offline}</p>
                    </div>
                    <div id="setup">
                        <div id="logo" className="hidden"></div>
                        <div id="page1" className="hidden">
                            <p id="setup_question1">{setup_question1}</p>
                            <div id="buttons">
                                <button id="full" className="center">
                                    {next}
                                </button>
                            </div>
                        </div>

                        <div id="page2" className="hidden">
                            <p className="text-center setup-ask" id="setup_question2">
                                {setup_question2}
                            </p>
                            <div className="center">
                                <select name="channel" id="channel" className="dropdown-button">
                                    <option value="stable">Stable</option>
                                    <option value="canary">Canary</option>
                                    <option value="ptb">PTB</option>
                                </select>
                            </div>
                            <div id="buttons">
                                <button id="next-page2" className="center">
                                    {next}
                                </button>
                            </div>
                        </div>

                        <div id="page3" className="hidden">
                            <p className="text-center setup-ask" id="setup_question4">
                                {setup_question4}
                            </p>
                            <div className="center">
                                <select name="mod" id="mod" className="dropdown-button">
                                    <option value="vencord">Vencord</option>
                                    <option value="equicord">Equicord</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                            <div id="buttons">
                                <button id="next-page3" className="center">
                                    {next}
                                </button>
                            </div>
                        </div>
                        <div id="page4" className={css.hidden}>
                            <p className="text-center setup-ask" id="setup_question5">
                                {setup_question5}
                            </p>
                            <div className="center">
                                <select name="tray" id="tray" className="dropdown-button">
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <p className="text-center" id="linuxNotice"></p>
                            <div id="buttons">
                                <button id="next-page4" className="center">
                                    {next}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </>
    );
}
