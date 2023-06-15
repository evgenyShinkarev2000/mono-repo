import { AppEnv } from "./AppEnv";

export const DefaultAppEnv: AppEnv = {
  kanbanApiUri: BuildEnv.KANBAN_API_URI ?? import.meta.env.VITE_KANBAN_API_URI,
  gantApiUri: BuildEnv.GANT_API_URI ?? import.meta.env.VITE_GANT_API_URI,
  gradeApiUri: BuildEnv.GRADE_API_URI ?? import.meta.env.VITE_GRADE_API_URI,
}