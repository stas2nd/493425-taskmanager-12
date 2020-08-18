import {createElement} from "../utils.js";

export default class TaskButtons {
  constructor(buttons) {
    this._buttons = buttons;
    this._archiveActive = this._buttons.isArchive
      ? `card__btn--disabled`
      : ``;
    this._favoriteActive = this._buttons.isFavorite
      ? `card__btn--disabled`
      : ``;

    this._element = null;
  }

  getTemplate() {
    return (
      `<button type="button" class="card__btn card__btn--edit">
        edit
      </button>
      <button type="button" class="card__btn card__btn--archive ${this._archiveActive}">
      archive
      </button>
      <button type="button" class="card__btn card__btn--favorites ${this._favoriteActive}">
        favorites
      </button>`
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
