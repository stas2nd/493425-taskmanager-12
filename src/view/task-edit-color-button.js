export const createTaskEditColorButton = (color, rest) => {
  const cur = rest.find((v) => v.currentColor);
  return (
    `<input
      type="radio"
      id="color-${color}"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="color"
      value="${color}"
      ${cur && cur.currentColor === color ? `checked` : ``}
    />
    <label
      for="color-${color}"
      class="card__color card__color--${color}"
      >${color}</label>`
  );
};
