import AbstractView from "./abstract.js";
import TaskEditRepeatingDayView from "./task-edit-repeating-day.js";

export default class TaskEditRepeating extends AbstractView {
  constructor(repeat, isRepeating, id) {
    super();
    this._repeat = repeat;
    this._isRepeating = isRepeating;
    this._currentId = id;
    this._days = this._isRepeating ?
      this._makeTemplateFromArrayClass(TaskEditRepeatingDayView, Object.entries(this._repeat), this._currentId) : ``;
  }

  getTemplate() {
    return (
      `<button class="card__repeat-toggle" type="button">
        repeat:<span class="card__repeat-status">${this._isRepeating ? `yes` : `no`}</span>
      </button>
      ${this._isRepeating ? `<fieldset class="card__repeat-days">
        <div class="card__repeat-days-inner">
          ${this._days}
        </div>
      </fieldset>` : ``}`
    );
  }
}
