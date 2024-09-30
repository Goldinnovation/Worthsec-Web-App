import {defineConfig} from "vitest/config"
import react from "@vitejs/plugin-react"
import tsconfigPaths from 'vite-tsconfig-paths'
import { configDefaults} from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    // test: {
    //     environment: "jsdom"
    // }
    test: {
        environment: "node",
        exclude: [...configDefaults.exclude, "e2e/*"],
        root: fileURLToPath(new URL("./", import.meta.url))
      },
    server: {
        open: true
      }
})