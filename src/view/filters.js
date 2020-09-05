import FilterItemView from "./filter-item.js";
import AbstractView from "./abstract.js";

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = this._makeTemplateFromArrayClass(FilterItemView, filters, {type: currentFilterType});
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return (
      `<section class="main__filter filter container">
        ${this._filters}
      </section>`
    );
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
