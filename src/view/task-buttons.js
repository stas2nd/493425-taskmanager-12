import AbstractView from "./abstract.js";

export default class TaskButtons extends AbstractView {
  constructor(buttons) {
    super();
    this._buttons = buttons;
    this._archiveActive = this._buttons.isArchive
      ? `card__btn--disabled`
      : ``;
    this._favoriteActive = this._buttons.isFavorite
      ? `card__btn--disabled`
      : ``;
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
}
