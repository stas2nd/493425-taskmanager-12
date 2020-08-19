import AbstractView from "./abstract.js";

export default class FilterItem extends AbstractView {
  constructor(filter, rest) {
    super();
    this._filter = filter;
    this._arrayIndex = rest.find((v) => v.arrayIndex !== undefined).arrayIndex;
    this._index = rest.find((v) => v.index !== undefined).index;
  }

  getTemplate() {
    return this._filter.name ? (
      `<input
        type="radio"
        id="filter__${this._filter.name}"
        class="filter__input visually-hidden"
        name="filter"
        ${this._filter.count === 0 ? `disabled` : ``}
        ${this._arrayIndex === this._index ? `checked` : ``}
      />
      <label for="filter__${this._filter.name}" class="filter__label">
      ${this._filter.name} <span class="filter__${this._filter.name}-count">${this._filter.count}</span></label>`
    ) : ``;
  }
}
