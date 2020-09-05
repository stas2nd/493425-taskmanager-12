import {TASK_COUNT} from "./const.js";
import {generateTask} from "./mock/task.js";
import TasksModel from "./model/tasks.js";
import FilterModel from "./model/filters.js";
import BoardPresenter from "./presenter/board.js";
import FiltersPresenter from "./presenter/filters.js";
import MenuPresenter from "./presenter/menu.js";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);

const boardPresenter = new BoardPresenter(siteMainElement, tasksModel, filterModel);
const filtersPresenter = new FiltersPresenter(siteMainElement, filterModel, tasksModel);
const menuPresenter = new MenuPresenter(siteMainElement, boardPresenter, tasksModel, filterModel);

filtersPresenter.init();
boardPresenter.init();
menuPresenter.init();
