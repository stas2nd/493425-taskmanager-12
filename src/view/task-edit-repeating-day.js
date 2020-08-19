
import AbstractView from "./abstract.js";

export default class TaskEditRepeatingDay extends AbstractView {
  constructor(day, rest) {
    super();
    [this._day, this._repeat] = day;
    this._currentId = rest.find((v) => v.currentId !== undefined);
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
}
