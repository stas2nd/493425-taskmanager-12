import {createElement} from "../utils.js";

const createTaskEditColorButton = (color, rest) => {
  const cur = rest.find((v) => v.currentColor);
  return (
    `<input
      type="radio"
      id="color-${color}"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="color"
      value="${color}"
      ${cur && cur.currentColor === color ? `checked` : ``}
    />
    <label
      for="color-${color}"
      class="card__color card__color--${color}"
      >${color}</label>`
  );
};

export default class TaskEditColorButton {
  constructor(button, color) {
    this._button = button;
    this._color = color;
    this._element = null;
  }

  getTemplate() {
    return createTaskEditColorButton(this._button, this._color);
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
