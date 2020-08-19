import AbstractView from "./abstract.js";
import {humanizeTaskDueDate} from "../utils/task.js";

export default class TaskEditDate extends AbstractView {
  constructor(date) {
    super();
    this._date = date;
  }

  getTemplate() {
    return (
      `<button class="card__date-deadline-toggle" type="button">
        date: <span class="card__date-status">${this._date !== null ? `yes` : `no`}</span>
      </button>
      ${this._date !== null ? `<fieldset class="card__date-deadline">
        <label class="card__input-deadline-wrap">
          <input
            class="card__date"
            type="text"
            placeholder=""
            name="date"
            value="${humanizeTaskDueDate(this._date)}"
          />
        </label>
      </fieldset>` : ``}`
    );
  }
}
