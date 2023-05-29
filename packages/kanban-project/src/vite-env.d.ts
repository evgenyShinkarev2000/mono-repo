/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_KANBAN_API_URI: string
  readonly VITE_KANBAN_MOCK_API: "true" | "false"
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}