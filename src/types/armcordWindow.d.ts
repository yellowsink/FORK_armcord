export interface ArmCordWindow {
    window: {
        show: () => void;
        hide: () => void;
        minimize: () => void;
        maximize: () => void;
    };
    titlebar: {
        injectTitlebar: () => void;
        isTitlebar: boolean;
    };
    electron: string;
    channel: string;
    setTrayIcon: (favicon: string) => void;
    getLang: (toGet: string) => Promise<string>;
    getDisplayMediaSelector: () => Promise<string>;
    version: string;
    mods: string;
    openThemesWindow: () => void;
}
