import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths';
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        environment: "node",
        globals: true,
        poolOptions: {
            threads: {
                singleThread: true //allows the test to run sequantially 
            }
        },
        include: [
            'server/__tests__/integration/**/*.test.ts'
        ],
    },
    server: {
        open: true
    }
});
