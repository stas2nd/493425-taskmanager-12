import {TASK_COUNT, TASK_COUNT_PER_STEP} from "./const.js";
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
let counter = 0;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const renderTask = (taskListElement, task, count) => {
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
    taskEditComponent = new TaskEditView(task, count);
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

  render(taskListElement, taskComponent.getElement());
};

const renderBoard = (boardContainer, boardTasks) => {
  const boardComponent = new BoardView();
  const taskListComponent = new TaskListView();

  render(boardContainer, boardComponent.getElement());
  render(boardComponent.getElement(), taskListComponent.getElement());

  if (boardTasks.every((task) => task.isArchive)) {
    render(boardComponent.getElement(), new NoTaskView().getElement(), true);
    return;
  }

  render(boardComponent.getElement(), new SortingView().getElement(), true);

  boardTasks
    .slice(0, Math.min(tasks.length, TASK_COUNT_PER_STEP))
    .forEach((boardTask) => {
      renderTask(taskListComponent.getElement(), boardTask, counter);
      counter += 1;
    });

  if (boardTasks.length > TASK_COUNT_PER_STEP) {
    let renderedTaskCount = TASK_COUNT_PER_STEP;

    const loadMoreButtonComponent = new LoadMoreButtonView();

    render(boardComponent.getElement(), loadMoreButtonComponent.getElement());

    loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      boardTasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((boardTask) => {
          renderTask(taskListComponent.getElement(), boardTask, counter);
          counter += 1;
        });

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= boardTasks.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }
    });
  }
};

render(siteHeaderElement, new SiteMenuView().getElement());
render(siteMainElement, new FilterView(filters).getElement());

renderBoard(siteMainElement, tasks);
