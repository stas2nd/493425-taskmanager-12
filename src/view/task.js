import TaskButtonsView from "./task-buttons.js";
import {isTaskExpired, isTaskRepeating, formatTaskDueDate} from "../utils/task.js";
import AbstractView from "./abstract.js";

export default class Task extends AbstractView {
  constructor(task) {
    super();
    this._task = task;
    this._buttons = new TaskButtonsView({isArchive: this._task.isArchive, isFavorite: this._task.isFavorite}).getTemplate();

    this._date = formatTaskDueDate(this._task.dueDate);
    this._deadlineClassName = isTaskExpired(this._task.dueDate)
      ? `card--deadline`
      : ``;
    this._repeatClassName = isTaskRepeating(this._task.repeating)
      ? `card--repeat`
      : ``;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._archiveClickHandler = this._archiveClickHandler.bind(this);
  }

  getTemplate() {
    return (
      `<article class="card card--${this._task.color} ${this._deadlineClassName} ${this._repeatClassName}">
        <div class="card__form">
          <div class="card__inner">
            <div class="card__control">
              ${this._buttons}
            </div>
            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>
            <div class="card__textarea-wrap">
              <p class="card__text">${this._task.description}</p>
            </div>
            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <div class="card__date-deadline">
                    <p class="card__input-deadline-wrap">
                      <span class="card__date">${this._date}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>`
    );
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _archiveClickHandler(evt) {
    evt.preventDefault();
    this._callback.archiveClick();
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, this._editClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setArchiveClickHandler(callback) {
    this._callback.archiveClick = callback;
    this.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, this._archiveClickHandler);
  }

}
