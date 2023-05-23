import { createSelector } from '@reduxjs/toolkit';
import { kanbanApi } from "./Api";
import { TaskShort } from '@kanban/data/TaskShort';

const selectSerializableTasks = kanbanApi.endpoints.getShortTasksSerializable.select();

export const selectShortTasks = createSelector(
  selectSerializableTasks,
  (serializableShortTasksResponseResponse) =>
  {

    return {
      ...serializableShortTasksResponseResponse,
      data: serializableShortTasksResponseResponse.data?.map(sts => (
        {
          ...sts,
          deadline: new Date(sts.deadline),
        })) as TaskShort[] | undefined
    }
  }
)

