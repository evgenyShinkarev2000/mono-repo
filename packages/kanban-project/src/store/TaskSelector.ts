import { createSelector } from '@reduxjs/toolkit';
import { kanbanApi } from "./Api";
import { RootState } from '../../../shared/src/store';
import { Project } from '@kanban/data/Project';
import { Person } from '@kanban/data/Person';
import { TaskShort } from '@kanban/data/TaskShort';

const selectTasks = kanbanApi.endpoints.getShortTasks.select();
const selectProjectFilter = (store: RootState) => store.kanbanReducer.projectFilter;
const selectExecutorFilter = (store: RootState) => store.kanbanReducer.taskExecutorFilter;
const selectCurrentUser = kanbanApi.endpoints.getCurrentUser.select();
const emptyTasks: any[] = [];

export const selectFilteredTasks = createSelector(
  selectTasks,
  selectProjectFilter,
  selectExecutorFilter,
  selectCurrentUser,
  (tasksData, projectFilter, executorFilter, currentUserData) =>
  {

    return tasksData.data?.filter(
      task => isWantedProject(task, projectFilter) && isWasntedExecutor(task, executorFilter, currentUserData.data)
    ) ?? emptyTasks;
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

const isWasntedExecutor = (task: TaskShort, executorFilter: "all" | "my", executor: Person | undefined) =>
{
  if (!executor || executorFilter === "all")
  {
    return true;
  }

  return task.author.id === executor.id || executor.id in task.contractors.map(c => c.id);
}