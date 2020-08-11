
import {createElement} from "../utils.js";

const createTaskEditRepeatingDayTemplate = ([day, repeat]) => {
  return (
    `<input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${day}"
      name="repeat"
      value="${day}"
      ${repeat ? `checked` : ``}
    />
    <label class="card__repeat-day" for="repeat-${day}"
      >${day}</label
    >`
  );
};

export default class TaskEditRepeatingDay {
  constructor(day) {
    this._day = day;
    this._element = null;
  }

  getTemplate() {
    return createTaskEditRepeatingDayTemplate(this._day);
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
