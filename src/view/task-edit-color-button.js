export const createTaskEditColorButton = ({id, value, state = ``}) => {
  return (
    `<input
      type="radio"
      id="${id}"
      class="card__color-input card__color-input--${value} visually-hidden"
      name="color"
      value="${value}"
      ${state}
    />
    <label
      for="${id}"
      class="card__color card__color--${value}"
      >${value}</label>`
  );
};
