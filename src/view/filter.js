import FilterItemView from "./filter-item.js";
import AbstractView from "./abstract.js";

export default class Filter extends AbstractView {
  constructor(filters) {
    super();
    this._filters = this._makeTemplateFromArrayClass(FilterItemView, filters, {index: 0});
  }

  getTemplate() {
    return (
      `<section class="main__filter filter container">
        ${this._filters}
      </section>`
    );
  }
}
