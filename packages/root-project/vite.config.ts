import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgr(),
    ],
    define:{
        "BuildEnv.KANBAN_API_URI": JSON.stringify(process.env.KANBAN_API_URI),
    },
    resolve: {
        alias: {
            // Kanban
            "@kanban": path.resolve(__dirname, "../kanban-project/src/"),
        },
    },
});
