import { createSelector } from '@reduxjs/toolkit';
import { kanbanApi } from "./Api";
import { RootState } from '../../../shared/src/store';

const selectTasks = kanbanApi.endpoints.getShortTasks.select();
const selectProjectFilter = (store: RootState) => store.kanbanReducer.projectFilter;
const emptyTasks: any[] = [];

export const selectFilteredTasks = createSelector(
  selectTasks,
  selectProjectFilter,
  (result, projectFilter) =>
  {
    const { data } = result;
    if (!projectFilter)
    {
      return data ?? emptyTasks;
    }

    return data?.filter(t => t.project.id === projectFilter.id) ?? emptyTasks;
  }
)