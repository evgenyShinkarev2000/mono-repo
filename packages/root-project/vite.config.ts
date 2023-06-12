import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import vpc from "vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({fastRefresh: false}),
        svgr(),
        vpc(),
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
