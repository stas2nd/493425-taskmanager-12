export const createFilterItem = ({name, text, count, state = ``}) => {
  return name ?
    (
      `<input
        type="radio"
        id="filter__${name}"
        class="filter__input visually-hidden"
        name="filter"
        ${count === 0 ? `disabled` : state}
      />
      <label for="filter__${name}" class="filter__label">
      ${text} <span class="filter__${name}-count">${count}</span></label>`
    ) : ``;
};
