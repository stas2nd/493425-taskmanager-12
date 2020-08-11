import {isTaskRepeating, createElement, makeTemplateFromArrayClass} from "../utils.js";
import TaskEditRepeatingDayView from "./task-edit-repeating-day.js";

const createTaskEditRepeatingTemplate = (repeating) => {
  let days;
  if (isTaskRepeating(repeating)) {
    days = makeTemplateFromArrayClass(TaskEditRepeatingDayView, Object.entries(repeating));
  }

  return (
    `<button class="card__repeat-toggle" type="button">
      repeat:<span class="card__repeat-status">${isTaskRepeating(repeating) ? `yes` : `no`}</span>
    </button>
    ${isTaskRepeating(repeating) ? `<fieldset class="card__repeat-days">
      <div class="card__repeat-days-inner">
        ${days}
      </div>
    </fieldset>` : ``}`
  );
};

export default class TaskEditRepeating {
  constructor(repeat) {
    this._repeat = repeat;
    this._element = null;
  }

  getTemplate() {
    return createTaskEditRepeatingTemplate(this._repeat);
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
