import {makeTemplateFromArray} from "../utils.js";
import {createFilterItem} from "./filter-item.js";

export const createFilterTemplate = (filters) => {
  filters = makeTemplateFromArray(createFilterItem, filters, {index: 0});
  return (
    `<section class="main__filter filter container">
      ${filters}
    </section>`
  );
};
