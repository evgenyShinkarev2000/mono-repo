export type TaskShortGetResponse = {
  task_id: number,
  task_name: string,
  project_id: number,
  project_name: string,
  team_id: number,
  team_name: string,
  team_tag: string,
  responsible_id: number,
  responsible_first_name: string,
  responsible_last_name: string,
  responsible_patronymic: string,
  deadline: string, //2019-03-28
  status_id: number,
  status_name: string
}