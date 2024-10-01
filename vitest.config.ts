import {defineConfig} from "vitest/config"
import react from "@vitejs/plugin-react"
import tsconfigPaths from 'vite-tsconfig-paths'


export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        environment: "node",
        include: [
          "server/__tests__/controller/**/*.ts",       // Include unit tests
          'server/__tests__/unit/**/*.test.ts'  // Include integration tests
        ],
      },
    server: {
        open: true
      }
})