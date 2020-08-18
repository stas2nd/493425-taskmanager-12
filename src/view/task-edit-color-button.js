import {createElement} from "../utils.js";

const createTaskEditColorButton = (color, rest) => {
  const curColor = rest.find((v) => v.currentColor);
  const curId = rest.find((v) => v.currentId !== undefined);
  return (
    `<input
      type="radio"
      id="color${curId ? `-` + curId.currentId : ``}-${color}"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="color"
      value="${color}"
      ${curColor && curColor.currentColor === color ? `checked` : ``}
    />
    <label
      for="color${curId ? `-` + curId.currentId : ``}-${color}"
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
