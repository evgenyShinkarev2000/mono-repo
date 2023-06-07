export type CommentaryDto = {
    id?: number,
    task_id: number,
    author_id: number,
    author_first_name: string,
    author_last_name: string,
    author_patronymic: string,
    content: string,
    created_at?: string, //2019-03-28
}