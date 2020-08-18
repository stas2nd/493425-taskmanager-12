import {humanizeTaskDueDate, createElement} from "../utils.js";

export default class TaskEditDate {
  constructor(date) {
    this._date = date;
    this._element = null;
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
