import moment from "moment";
import {COLORS} from "../const.js";
import {getRandomInteger} from "./common.js";

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return new Date(currentDate);
};

export const getRandomColor = () => {
  return COLORS[getRandomInteger(0, COLORS.length - 1)];
};

export const isTaskExpired = (dueDate) => {
  return dueDate && moment(getCurrentDate()).isAfter(dueDate, `day`);
};

export const isTaskExpiringToday = (dueDate) => {
  return dueDate && moment(dueDate).isSame(getCurrentDate(), `day`);
};

export const isTaskRepeating = (repeating) => {
  return Object.values(repeating).some(Boolean);
};

export const formatTaskDueDate = (dueDate) => {
  return dueDate instanceof Date ? moment(dueDate).format(`D MMMM`) : ``;
};

export const sortTaskUp = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return taskA.dueDate.getTime() - taskB.dueDate.getTime();
};

export const sortTaskDown = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return taskB.dueDate.getTime() - taskA.dueDate.getTime();
};

export const isDatesEqual = (dateA, dateB) => {
  return (dateA === null && dateB === null) || moment(dateA).isSame(dateB, `day`);
};
