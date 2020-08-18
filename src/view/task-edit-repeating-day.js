
import {createElement} from "../utils.js";

export default class TaskEditRepeatingDay {
  constructor(day, rest) {
    [this._day, this._repeat] = day;
    this._currentId = rest.find((v) => v.currentId !== undefined);
    this._element = null;
  }

  getTemplate() {
    return (
      `<input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat${this._currentId ? `-` + this._currentId.currentId : ``}-${this._day}"
        name="repeat"
        value="${this._day}"
        ${this._repeat ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat${this._currentId ? `-` + this._currentId.currentId : ``}-${this._day}"
        >${this._day}</label
      >`
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
