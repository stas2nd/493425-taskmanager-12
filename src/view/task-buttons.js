export const createTaskButtons = ({isArchive, isFavorite}) => {
  const archiveActive = isArchive
    ? `card__btn--disabled`
    : ``;

  const favoriteActive = isFavorite
    ? `card__btn--disabled`
    : ``;

  return (
    `<button type="button" class="card__btn card__btn--edit">
      edit
    </button>
    <button type="button" class="card__btn card__btn--archive ${archiveActive}">
    archive
    </button>
    <button type="button" class="card__btn card__btn--favorites ${favoriteActive}">
      favorites
    </button>`
  );
};
