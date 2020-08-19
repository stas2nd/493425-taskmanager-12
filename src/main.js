import {TASK_COUNT} from "./const.js";
import {render} from "./utils/render.js";
import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import {generateTask} from "./mock/task.js";
import {generateFilters} from "./mock/filters.js";
import BoardPresenter from "./presenter/board.js";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilters(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const boardPresenter = new BoardPresenter(siteMainElement);

render(siteHeaderElement, new SiteMenuView());
render(siteMainElement, new FilterView(filters));

boardPresenter.init(tasks);
