import TaskView from "../view/task.js";
import TaskEditView from "../view/task-edit.js";
import {render, replace, remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";
import {isTaskRepeating, isDatesEqual} from "../utils/task.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Task {
  constructor(taskListContainer, changeData, changeMode) {
    this._taskListContainer = taskListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._mode = Mode.DEFAULT;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleArchiveClick = this._handleArchiveClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._closeEditForm = this._closeEditForm.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(task) {
    this._task = task;

    const prevTaskComponent = this._taskComponent;
    const prevTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new TaskView(this._task);
    this._taskComponent.setEditClickHandler(this._handleEditClick);
    this._taskComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._taskComponent.setArchiveClickHandler(this._handleArchiveClick);

    if (prevTaskComponent === null) {
      render(this._taskListContainer, this._taskComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._taskComponent, prevTaskComponent);
    }

    if (this._mode === Mode.EDITING) {
      this._taskEditComponent = new TaskEditView(this._task);
      replace(this._taskEditComponent, prevTaskEditComponent);
    }

    remove(prevTaskComponent);
    if (prevTaskEditComponent) {
      remove(prevTaskEditComponent);
    }
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    this._taskEditComponent = new TaskEditView(this._task);
    this._taskEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._taskEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    replace(this._taskEditComponent, this._taskComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._taskComponent, this._taskEditComponent);
    this._taskEditComponent.removeFormSubmitHandler(this._handleFormSubmit);
    this._taskEditComponent.removeDeleteClickHandler(this._handleDeleteClick);
    remove(this._taskEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closeEditForm(evt);
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_TASK,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._task,
            {
              isFavorite: !this._task.isFavorite
            }
        )
    );
  }

  _handleArchiveClick() {
    this._changeData(
        UserAction.UPDATE_TASK,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._task,
            {
              isArchive: !this._task.isArchive
            }
        )
    );
  }

  _handleFormSubmit(update) {
    const isMinorUpdate =
      !isDatesEqual(this._task.dueDate, update.dueDate) ||
      isTaskRepeating(this._task.repeating) !== isTaskRepeating(update.repeating);

    this._changeData(
        UserAction.UPDATE_TASK,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
        update
    );
    this._closeEditForm();
  }

  _handleDeleteClick(task) {
    this._changeData(
        UserAction.DELETE_TASK,
        UpdateType.MINOR,
        task
    );
  }

  _closeEditForm() {
    this._replaceFormToCard();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    remove(this._taskComponent);
    if (this._taskEditComponent) {
      remove(this._taskEditComponent);
    }
  }

}
