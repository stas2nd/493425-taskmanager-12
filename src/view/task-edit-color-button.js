import AbstractView from "./abstract.js";

export default class TaskEditColorButton extends AbstractView {
  constructor(color, rest) {
    super();
    this._color = color;
    this._curColor = rest.find((v) => v.currentColor);
    this._curId = rest.find((v) => v.currentId !== undefined);
  }

  getTemplate() {
    return (
      `<input
        type="radio"
        id="color${this._curId ? `-` + this._curId.currentId : ``}-${this._color}"
        class="card__color-input card__color-input--${this._color} visually-hidden"
        name="color"
        value="${this._color}"
        ${this._curColor && this._curColor.currentColor === this._color ? `checked` : ``}
      />
      <label
        for="color${this._curId ? `-` + this._curId.currentId : ``}-${this._color}"
        class="card__color card__color--${this._color}"
        >${this._color}</label>`
    );
  }
}
