import { Person } from "@kanban/data/Person";
import { Project } from "@kanban/data/Project";
import { TaskShort } from "@kanban/data/TaskShort";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from '../../../shared/src/store';
import { selectShortTasks } from "./TaskShortSelector";
import { ExecutorFilter } from "@kanban/types/ExecutorFilter";

const selectProjectFilter = (store: RootState) => store.kanbanReducer.projectFilter;
const selectExecutorFilter = (store: RootState) => store.kanbanReducer.taskExecutorFilter;
const selectCurrentUser = (store: RootState) => store.kanbanReducer.currentUser;

export const selectFilteredShortTasks = createSelector(
  selectShortTasks,
  selectProjectFilter,
  selectExecutorFilter,
  selectCurrentUser,
  (tasksData, projectFilter, executorFilter, currentUser) =>
  {

    const filteredData = tasksData.data?.filter(
      task => isWantedProject(task, projectFilter) && isWasntedExecutor(task, executorFilter, currentUser)
    )

    if (filteredData)
    {
      return {
        ...tasksData,
        data: filteredData
      }
    }

    return tasksData;
  }
)

const isWantedProject = (task: TaskShort, project: Project | undefined) =>
{
  if (!project)
  {
    return true;
  }

  return task.project.id === project.id;
}

const isWasntedExecutor = (task: TaskShort, executorFilter: ExecutorFilter, executor: Person | undefined) =>
{
  if (!executor || executorFilter === "Все задачи")
  {
    return true;
  }

  return task.author.id === executor.id || executor.id in task.contractors.map(c => c.id);
}