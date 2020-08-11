import {makeTemplateFromArray} from "../utils.js";
import {createFilterItem} from "./filter-item.js";
import {createElement} from "../utils.js";

const createFilterTemplate = (filters) => {
  filters = makeTemplateFromArray(createFilterItem, filters, {index: 0});
  return (
    `<section class="main__filter filter container">
      ${filters}
    </section>`
  );
};

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
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
