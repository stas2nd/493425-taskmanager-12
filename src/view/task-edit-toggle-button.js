export const createTaskEditToggleButton = ({name, text = name}) => {
  return (
    `<button class="card__${name}-toggle" type="button">
      ${text}: <span class="card__${text}-status">yes</span>
    </button>`
  );
};
