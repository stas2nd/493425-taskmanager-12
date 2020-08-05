import {makeTemplateFromArray} from "../main.js";
import {createFilterItem} from "./filter-item.js";

export const createFilterTemplate = (filters) => {
  filters = makeTemplateFromArray(filters, createFilterItem);
  return (
    `<section class="main__filter filter container">
      ${filters}
    </section>`
  );
};
