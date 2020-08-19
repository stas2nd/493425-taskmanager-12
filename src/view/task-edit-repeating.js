import AbstractView from "./abstract.js";
import {isTaskRepeating} from "../utils/task.js";
import TaskEditRepeatingDayView from "./task-edit-repeating-day.js";

export default class TaskEditRepeating extends AbstractView {
  constructor(repeat, id) {
    super();
    this._repeat = repeat;
    this._currentId = id;
    this._days = isTaskRepeating(this._repeat) ?
      this._makeTemplateFromArrayClass(TaskEditRepeatingDayView, Object.entries(this._repeat), this._currentId) : ``;
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
}
