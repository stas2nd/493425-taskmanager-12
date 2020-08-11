import {createElement} from "../utils.js";

const createTaskButtons = ({isArchive, isFavorite}) => {
  const archiveActive = isArchive
    ? `card__btn--disabled`
    : ``;

  const favoriteActive = isFavorite
    ? `card__btn--disabled`
    : ``;

  return (
    `<button type="button" class="card__btn card__btn--edit">
      edit
    </button>
    <button type="button" class="card__btn card__btn--archive ${archiveActive}">
    archive
    </button>
    <button type="button" class="card__btn card__btn--favorites ${favoriteActive}">
      favorites
    </button>`
  );
};

export default class TaskButtons {
  constructor(buttons) {
    this._buttons = buttons;
    this._element = null;
  }

  getTemplate() {
    return createTaskButtons(this._buttons);
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
