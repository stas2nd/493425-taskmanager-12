import {isTaskExpired, isTaskRepeating, isTaskExpiringToday} from "../utils.js";

const taskToFiltersMap = {
  all: (tasks) => tasks.filter((task) => !task.isArchive).length,
  overdue: (tasks) => tasks
    .filter((task) => (!task.isArchive && isTaskExpired(task.dueDate))).length,
  today: (tasks) => tasks
    .filter((task) => (!task.isArchive && isTaskExpiringToday(task.dueDate))).length,
  favorites: (tasks) => tasks
    .filter((task) => (!task.isArchive && task.isFavorite)).length,
  repeating: (tasks) => tasks
    .filter((task) => (!task.isArchive && isTaskRepeating(task.repeating))).length,
  archive: (tasks) => tasks.filter((task) => task.isArchive).length,
};

export const generateFilters = (tasks) => {
  return Object.entries(taskToFiltersMap).map(([filterName, countTasks]) => (
    {
      name: filterName,
      count: countTasks(tasks),
    }));
};
