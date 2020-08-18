import TaskButtonsView from "./task-buttons.js";
import {isTaskExpired, isTaskRepeating, humanizeTaskDueDate, createElement} from "../utils.js";

export default class Task {
  constructor(task) {
    this._task = task;
    this._buttons = new TaskButtonsView({isArchive: this._task.isArchive, isFavorite: this._task.isFavorite}).getTemplate();

    this._date = this._task.dueDate !== null
      ? humanizeTaskDueDate(this._task.dueDate)
      : ``;
    this._deadlineClassName = isTaskExpired(this._task.dueDate)
      ? `card--deadline`
      : ``;
    this._repeatClassName = isTaskRepeating(this._task.repeating)
      ? `card--repeat`
      : ``;

    this._element = null;
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

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
