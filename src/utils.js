import {COLORS} from "./const.js";

export const render = (container, element, isAfterBegin = false) => {
  if (isAfterBegin) {
    container.prepend(element);
  } else {
    container.append(element);
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const makeTemplateFromArray = (func, array, ...rest) => {
  return array ? array.reduce((accumulator, currentValue, index) => {
    return accumulator + func(currentValue, [...rest, {arrayIndex: index}]);
  }, ``) : ``;
};

export const makeTemplateFromArrayClass = (CL, array, ...rest) => {
  return array ? array.reduce((accumulator, currentValue, index) => {
    return accumulator + new CL(currentValue, [...rest, {arrayIndex: index}]).getTemplate();
  }, ``) : ``;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomColor = () => {
  return COLORS[getRandomInteger(0, COLORS.length - 1)];
};

const getCurrentDate = () => {
  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);

  return new Date(currentDate);
};

export const isTaskExpired = (dueDate) => {
  return dueDate && getCurrentDate().getTime() > dueDate.getTime();
};

export const isTaskExpiringToday = (dueDate) => {
  return dueDate && getCurrentDate().getTime() === dueDate.getTime();
};

export const isTaskRepeating = (repeating) => {
  return Object.values(repeating).some(Boolean);
};

export const humanizeTaskDueDate = (dueDate) => {
  return dueDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`});
};
