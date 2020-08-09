import {DESCRIPTIONS, NO_REPEATING} from "../const.js";
import {getRandomInteger} from "../utils.js";
import {getRandomColor} from "../utils.js";

const generateDescription = () => {
  return DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)];
};

const generateDate = () => {
  if (!getRandomInteger(0, 1)) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() + daysGap);

  return currentDate;
};

const generateRepeating = () => {
  return {
    mo: false,
    tu: false,
    we: !!getRandomInteger(0, 1),
    th: false,
    fr: !!getRandomInteger(0, 1),
    sa: false,
    su: false
  };
};

export const generateTask = () => {
  const dueDate = generateDate();
  const repeating = dueDate === null
    ? generateRepeating()
    : NO_REPEATING;

  return {
    description: generateDescription(),
    dueDate,
    repeating,
    color: getRandomColor(),
    isArchive: !!getRandomInteger(0, 1),
    isFavorite: !!getRandomInteger(0, 1)
  };
};
