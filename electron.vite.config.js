// @ts-check
import { defineConfig } from "electron-vite";

export default defineConfig(() => {
    return {
        main: {
            build: {
                lib: {
                    entry: "src/main.ts"
                }
            },
            plugins: [
                {
                    name: "vite-css-modules"
                }
            ]
        },
        preload: {
            build: {
                lib: {
                    entry: "src/discord/preload/preload.mts",
                }
            }
        }
    }
})