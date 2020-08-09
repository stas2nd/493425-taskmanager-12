import {COLORS, TASK_COUNT,TASK_COUNT_PER_STEP} from "./const.js";
import {render} from "./utils.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createBoardTaskTemplate} from "./view/board-task.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createFilterTemplate} from "./view/filter.js";
import {createTaskTemplate} from "./view/task.js";
import {createTaskEditTemplate} from "./view/task-edit.js";
import {createLoadMoreButtonTemplate} from "./view/load-more-button.js";
import {generateTask} from "./mock/task.js";
import {generateFilters} from "./mock/filters.js";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilters(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(filters), `beforeend`);
render(siteMainElement, createBoardTaskTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createSortingTemplate(), `afterbegin`);

const taskListElement = boardElement.querySelector(`.board__tasks`);
render(taskListElement, createTaskEditTemplate(tasks[0], COLORS), `beforeend`);

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(taskListElement, createTaskTemplate(tasks[i]), `beforeend`);
}
if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);

  const loadMoreButton = boardElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
