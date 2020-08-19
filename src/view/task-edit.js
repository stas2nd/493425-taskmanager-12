import TaskEditRepeatingView from "./task-edit-repeating.js";
import TaskEditColorButtonView from "./task-edit-color-button.js";
import TaskEditDateView from "./task-edit-date.js";
import {isTaskExpired, isTaskRepeating} from "../utils/task.js";
import {BLANK_TASK, COLORS} from "../const.js";
import AbstractView from "./abstract.js";

export default class TaskEdit extends AbstractView {
  constructor(task = BLANK_TASK, count) {
    super();
    this._task = task;
    this._count = count;

    this._deadlineClassName = isTaskExpired(this._task.dueDate)
      ? `card--deadline`
      : ``;

    this._repeatingClassName = isTaskRepeating(this._task.repeating)
      ? `card--repeat`
      : ``;

    this._date = new TaskEditDateView(this._task.dueDate).getTemplate();
    this._repeatingOption = new TaskEditRepeatingView(this._task.repeating, {currentId: count}).getTemplate();
    this._colors = this._makeTemplateFromArrayClass(TaskEditColorButtonView, COLORS, {currentColor: this._task.color, currentId: this._count});

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return (
      `<article class="card card--edit card--${this._task.color} ${this._deadlineClassName} ${this._repeatingClassName}">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>
            <div class="card__textarea-wrap">
              <label>
                <textarea
                  class="card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                >${this._task.description}</textarea>
              </label>
            </div>
            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  ${this._date}
                  ${this._repeatingOption}
                </div>
              </div>
              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                 ${this._colors}
                </div>
              </div>
            </div>
            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>`
    );
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  removeFormSubmitHandler() {
    if (this._callback.formSubmit) {
      this.getElement().querySelector(`form`).removeEventListener(`submit`, this._formSubmitHandler);
      delete this._callback.formSubmit;
    }
  }

}
