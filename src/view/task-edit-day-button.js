export const createTaskEditDayButton = ({id, value, state = ``}) => {
  return (
    `<input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="${id}"
      name="repeat"
      value="${value}"
      ${state}
    />
    <label class="card__repeat-day" for="${id}"
      >${value}</label>`
  );
};
