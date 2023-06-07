import { Commentary } from './../data/Commentary';
import { CommentarySerializable } from "@kanban/data/CommentarySerializable";
import { CommentaryDto } from "./CommentaryDto";
import { SqlDateConverter } from "@kanban/utils/converters/SqlDateConverter";

export class CommentaryConverter
{
  public static dtoToSerializable(comment: CommentaryDto): CommentarySerializable
  {
    return {
      task: {
        id: comment.task_id,
      },
      author: {
        id: comment.author_id,
        name: comment.author_first_name,
        surname: comment.author_last_name,
        patronymic: comment.author_patronymic,
      },
      content: comment.content,
      id: comment.id!,
      time: comment.created_at ? SqlDateConverter.toJs(comment.created_at).getTime() : undefined, // позже напишу selector или hook
    }
  }

  public static toDto(comment: Commentary): CommentaryDto
  {
    return {
      task_id: comment.task.id,
      id: comment.id,
      content: comment.content,
      author_id: comment.author.id,
      author_first_name: comment.author.name,
      author_last_name: comment.author.surname,
      author_patronymic: comment.author.patronymic,
    }
  }
}