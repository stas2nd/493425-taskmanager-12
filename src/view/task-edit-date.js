import AbstractView from "./abstract.js";
import {formatTaskDueDate} from "../utils/task.js";

export default class TaskEditDate extends AbstractView {
  constructor(date, isDueDate) {
    super();
    this._date = date;
    this._isDueDate = isDueDate;
  }

  getTemplate() {
    return (
      `<button class="card__date-deadline-toggle" type="button">
        date: <span class="card__date-status">${this._isDueDate ? `yes` : `no`}</span>
      </button>
      ${this._isDueDate ? `<fieldset class="card__date-deadline">
        <label class="card__input-deadline-wrap">
          <input
            class="card__date"
            type="text"
            placeholder=""
            name="date"
            value="${formatTaskDueDate(this._date)}"
          />
        </label>
      </fieldset>` : ``}`
    );
  }
}
