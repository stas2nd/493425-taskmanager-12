import {makeTemplateFromArrayClass} from "../utils.js";
import FilterItemView from "./filter-item.js";
import {createElement} from "../utils.js";

export default class Filter {
  constructor(filters) {
    this._filters = makeTemplateFromArrayClass(FilterItemView, filters, {index: 0});
    this._element = null;
  }

  getTemplate() {
    return (
      `<section class="main__filter filter container">
        ${this._filters}
      </section>`
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
