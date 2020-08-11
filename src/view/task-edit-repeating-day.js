export const createTaskEditRepeatingDayTemplate = ([day, repeat]) => {
  return (
    `<input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${day}"
      name="repeat"
      value="${day}"
      ${repeat ? `checked` : ``}
    />
    <label class="card__repeat-day" for="repeat-${day}"
      >${day}</label
    >`
  );
};
