import { TaskFull } from "@kanban/data/TaskFull";
import { kanbanApi } from "./Api";
import { TimeOnly } from "@kanban/utils/TimeOnly";


export const useFullTask = () =>
{
  const [trigger, response] = kanbanApi.endpoints.getFullTaskSerializable.useLazyQuery();
  if (response.data)
  {
    const data = response.data;
    return [trigger, {
      ...response,
      data: {
        ...data,
        deadline: new Date(data.deadline),
        plannedDates: {
          begin: new Date(data.plannedDates.begin),
          end: new Date(data.plannedDates.end),
        },
        comments: data.comments.map(comment => ({
          ...comment,
          time: new Date(comment.time!),
        })),
        wastedTime: new TimeOnly(data.wastedTime),
      } as TaskFull
    }
    ] as const
  }

  return [trigger, response] as const;
}