import {TASK_COUNT, TASK_COUNT_PER_STEP, RENDER_POSITION} from "./const.js";
import {render} from "./utils.js";
import SiteMenuView from "./view/site-menu.js";
import BoardView from "./view/board.js";
import SortingView from "./view/sorting.js";
import TaskListView from "./view/task-list.js";
import FilterView from "./view/filter.js";
import TaskView from "./view/task.js";
import TaskEditView from "./view/task-edit.js";
import LoadMoreButtonView from "./view/load-more-button.js";
import NoTaskView from "./view/no-task.js";
import {generateTask} from "./mock/task.js";
import {generateFilters} from "./mock/filters.js";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilters(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskView(task);
  let taskEditComponent;
  let taskEditForm;

  const closeEditForm = (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onSubmitForm = (evt) => {
    closeEditForm(evt);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      closeEditForm(evt);
    }
  };

  const replaceCardToForm = () => {
    taskEditComponent = new TaskEditView(task);
    taskEditForm = taskEditComponent.getElement().querySelector(`form`);
    taskEditForm.addEventListener(`submit`, onSubmitForm);
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
    taskEditForm.removeEventListener(`submit`, onSubmitForm);
    taskEditForm = null;
    taskEditComponent.getElement().remove();
    taskEditComponent.removeElement();
  };

  taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
  });

  render(taskListElement, taskComponent.getElement(), RENDER_POSITION.BEFOREEND);
};

const renderBoard = (boardContainer, boardTasks) => {
  const boardComponent = new BoardView();
  const taskListComponent = new TaskListView();

  render(boardContainer, boardComponent.getElement(), RENDER_POSITION.BEFOREEND);
  render(boardComponent.getElement(), taskListComponent.getElement(), RENDER_POSITION.BEFOREEND);

  if (boardTasks.every((task) => task.isArchive)) {
    render(boardComponent.getElement(), new NoTaskView().getElement(), RENDER_POSITION.AFTERBEGIN);
    return;
  }

  render(boardComponent.getElement(), new SortingView().getElement(), RENDER_POSITION.AFTERBEGIN);

  boardTasks
    .slice(0, Math.min(tasks.length, TASK_COUNT_PER_STEP))
    .forEach((boardTask) => renderTask(taskListComponent.getElement(), boardTask));

  if (boardTasks.length > TASK_COUNT_PER_STEP) {
    let renderedTaskCount = TASK_COUNT_PER_STEP;

    const loadMoreButtonComponent = new LoadMoreButtonView();

    render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RENDER_POSITION.BEFOREEND);

    loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      boardTasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((boardTask) => renderTask(taskListComponent.getElement(), boardTask));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= boardTasks.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }
    });
  }
};

render(siteHeaderElement, new SiteMenuView().getElement(), RENDER_POSITION.BEFOREEND);
render(siteMainElement, new FilterView(filters).getElement(), RENDER_POSITION.BEFOREEND);

renderBoard(siteMainElement, tasks);
