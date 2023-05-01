import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // Kanban
            "@kanban": path.resolve(__dirname, "../kanban-project/src/"),
        },
    },
});
