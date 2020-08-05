import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createBoardTaskTemplate} from "./view/board-task.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createFilterTemplate} from "./view/filter.js";
import {createTaskTemplate} from "./view/task.js";
import {createTaskEditTemplate} from "./view/task-edit.js";
import {createLoadMoreButtonTemplate} from "./view/load-more-button.js";

const TASK_COUNT = 3;
const FILTER_ARRAY = [
  {
    name: `all`,
    text: `All`,
    count: 13,
    state: `checked`
  },
  {
    name: `overdue`,
    text: `Overdue`,
    count: 0
  },
  {
    name: `today`,
    text: `Today`,
    count: 0
  },
  {
    name: `favorites`,
    text: `Favorites`,
    count: 1
  },
  {
    name: `repeating`,
    text: `Repeating`,
    count: 1
  },
  {
    name: `archive`,
    text: `Archive`,
    count: 115
  }
];
const BUTTON_ARRAY = [
  {
    name: `edit`
  },
  {
    name: `archive`
  },
  {
    name: `favorites`,
    disabled: true
  }
];
const DATE_BUTTON = {
  name: `date-deadline`,
  text: `date`
};
const REPEAT_BUTTON = {
  name: `repeat`
};
const DAY_ARRAY = [
  {
    id: `repeat-mo-4`,
    value: `mo`
  },
  {
    id: `repeat-tu-4`,
    value: `tu`,
    state: `checked`
  },
  {
    id: `repeat-we-4`,
    value: `we`
  },
  {
    id: `repeat-th-4`,
    value: `th`
  },
  {
    id: `repeat-fr-4`,
    value: `fr`,
    state: `checked`
  },
  {
    id: `repeat-sa-4`,
    value: `sa`
  },
  {
    id: `repeat-su-4`,
    value: `su`,
    state: `checked`
  }
];
const COLOR_ARRAY = [
  {
    id: `color-black-4`,
    value: `black`
  },
  {
    id: `color-yellow-4`,
    value: `yellow`,
    state: `checked`
  },
  {
    id: `color-blue-4`,
    value: `blue`
  },
  {
    id: `color-green-4`,
    value: `green`
  },
  {
    id: `color-pink-4`,
    value: `pink`
  }
];

export const makeTemplateFromArray = (array, func) => {
  return array ? array.reduce((accumulator, currentValue) => {
    return accumulator + func(currentValue);
  }, ``) : ``;
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(FILTER_ARRAY), `beforeend`);
render(siteMainElement, createBoardTaskTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createSortingTemplate(), `afterbegin`);

const taskListElement = boardElement.querySelector(`.board__tasks`);
render(taskListElement, createTaskEditTemplate(DATE_BUTTON, REPEAT_BUTTON, DAY_ARRAY, COLOR_ARRAY), `beforeend`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, createTaskTemplate(BUTTON_ARRAY), `beforeend`);
}

render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);
