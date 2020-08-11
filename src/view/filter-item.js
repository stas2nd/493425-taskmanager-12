export const createFilterItem = ({name, count}, rest) => {
  const arrayIndex = rest.find((v) => v.arrayIndex !== undefined).arrayIndex;
  const index = rest.find((v) => v.index !== undefined).index;
  return name ?
    (
      `<input
        type="radio"
        id="filter__${name}"
        class="filter__input visually-hidden"
        name="filter"
        ${count === 0 ? `disabled` : ``}
        ${arrayIndex === index ? `checked` : ``}
      />
      <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label>`
    ) : ``;
};
