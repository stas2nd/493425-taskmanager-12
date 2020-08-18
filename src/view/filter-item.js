import {createElement} from "../utils.js";

export default class FilterItem {
  constructor(filter, rest) {
    this._filter = filter;
    this._arrayIndex = rest.find((v) => v.arrayIndex !== undefined).arrayIndex;
    this._index = rest.find((v) => v.index !== undefined).index;
    this._element = null;
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
