export const createTaskButton = ({name, disabled = false}) => {
  return (
    `<button type="button" class="card__btn card__btn--${name} ${disabled ? `card__btn--disabled` : `` }">
      ${name}
    </button>`
  );
};
