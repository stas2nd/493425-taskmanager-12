import AbstractView from "./abstract.js";

export default class FilterItem extends AbstractView {
  constructor(filter, rest) {
    super();
    this._filter = filter;
    this._currentFilterType = rest.find((v) => v.type !== undefined).type;
  }

  getTemplate() {
    return this._filter.name ? (
      `<input
        type="radio"
        id="filter__${this._filter.name}"
        class="filter__input visually-hidden"
        name="filter"
        ${this._filter.count === 0 ? `disabled` : ``}
        ${this._filter.type === this._currentFilterType ? `checked` : ``}
        value="${this._filter.type}"
      />
      <label for="filter__${this._filter.name}" class="filter__label">
      ${this._filter.name} <span class="filter__${this._filter.name}-count">${this._filter.count}</span></label>`
    ) : ``;
  }
}
