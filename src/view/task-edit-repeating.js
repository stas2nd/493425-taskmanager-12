import {isTaskRepeating, createElement, makeTemplateFromArrayClass} from "../utils.js";
import TaskEditRepeatingDayView from "./task-edit-repeating-day.js";

export default class TaskEditRepeating {
  constructor(repeat, id) {
    this._repeat = repeat;
    this._currentId = id;
    this._days = isTaskRepeating(this._repeat) ?
      makeTemplateFromArrayClass(TaskEditRepeatingDayView, Object.entries(this._repeat), this._currentId) : ``;
    this._element = null;
  }

  getTemplate() {
    return (
      `<button class="card__repeat-toggle" type="button">
        repeat:<span class="card__repeat-status">${isTaskRepeating(this._repeat) ? `yes` : `no`}</span>
      </button>
      ${isTaskRepeating(this._repeat) ? `<fieldset class="card__repeat-days">
        <div class="card__repeat-days-inner">
          ${this._days}
        </div>
      </fieldset>` : ``}`
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
