import {humanizeTaskDueDate, createElement} from "../utils.js";

const createTaskEditDateTemplate = (dueDate) => {
  return (
    `<button class="card__date-deadline-toggle" type="button">
      date: <span class="card__date-status">${dueDate !== null ? `yes` : `no`}</span>
    </button>
    ${dueDate !== null ? `<fieldset class="card__date-deadline">
      <label class="card__input-deadline-wrap">
        <input
          class="card__date"
          type="text"
          placeholder=""
          name="date"
          value="${humanizeTaskDueDate(dueDate)}"
        />
      </label>
    </fieldset>` : ``}`
  );
};

export default class TaskEditDate {
  constructor(date) {
    this._date = date;
    this._element = null;
  }

  getTemplate() {
    return createTaskEditDateTemplate(this._date);
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
