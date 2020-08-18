import TaskEditRepeatingView from "./task-edit-repeating.js";
import TaskEditColorButtonView from "./task-edit-color-button.js";
import TaskEditDateView from "./task-edit-date.js";
import {makeTemplateFromArrayClass} from "../utils.js";
import {isTaskExpired, isTaskRepeating, createElement} from "../utils.js";
import {BLANK_TASK, COLORS} from "../const.js";

export default class TaskEdit {
  constructor(task = BLANK_TASK, count) {
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
    this._colors = makeTemplateFromArrayClass(TaskEditColorButtonView, COLORS, {currentColor: this._task.color, currentId: this._count});

    this._element = null;
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
