import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import vpc from "vite-plugin-commonjs";
import vprt from "vite-plugin-require-transform";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({ fastRefresh: false }),
        svgr(),
        // vpc(), // Doesn't work with <img src='require...'> in grade project.
        vprt({fileRegex: /.jsx$/}),
    ],
    define: {
        "BuildEnv.KANBAN_API_URI": JSON.stringify(process.env.KANBAN_API_URI),
    },
    resolve: {
        alias: {
            // Kanban
            "@kanban": path.resolve(__dirname, "../kanban-project/src/"),
        },
    },
});
