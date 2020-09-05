import {FilterType} from "../const";
import {isTaskExpired, isTaskExpiringToday, isTaskRepeating} from "./task";

export const filter = {
  [FilterType.ALL]: (tasks) => tasks.filter((task) => !task.isArchive),
  [FilterType.OVERDUE]: (tasks) => tasks.filter((task) => (!task.isArchive && isTaskExpired(task.dueDate))),
  [FilterType.TODAY]: (tasks) => tasks.filter((task) => (!task.isArchive && isTaskExpiringToday(task.dueDate))),
  [FilterType.FAVORITES]: (tasks) => tasks.filter((task) => (!task.isArchive && task.isFavorite)),
  [FilterType.REPEATING]: (tasks) => tasks.filter((task) => (!task.isArchive && isTaskRepeating(task.repeating))),
  [FilterType.ARCHIVE]: (tasks) => tasks.filter((task) => task.isArchive)
};
