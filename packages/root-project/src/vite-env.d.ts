/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_KANBAN_API_URI: string,
  readonly VITE_GANT_API_URI: string,
  readonly VITE_GRADE_API_URI: string,
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}