import { AppEnv } from "./AppEnv";

export const DefaultAppEnv: AppEnv = {
  kanbanApiUri: BuildEnv.KANBAN_API_URI ?? import.meta.env.VITE_KANBAN_API_URI
}