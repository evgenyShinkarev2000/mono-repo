import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // Kanban
            "src/types": path.resolve(__dirname, "../kanban-project/src/types"),
            "src/ui/icons": path.resolve(__dirname, "../kanban-project/src/ui/icons"),
            "src/hooks": path.resolve(__dirname, "../kanban-project/src/hooks"),
        },
    },
});
