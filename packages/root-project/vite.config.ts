import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import vprt from "vite-plugin-require-transform";
import svgr from "vite-plugin-svgr";

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
        "BuildEnv.GANT_API_URI": JSON.stringify(process.env.GANT_API_URI),
        "BuildEnv.GRADE_API_URI": JSON.stringify(process.env.GRADE_API_URI),
    },
    resolve: {
        alias: {
            // Kanban
            "@kanban": path.resolve(__dirname, "../kanban-project/src/"),
        },
    },
});
