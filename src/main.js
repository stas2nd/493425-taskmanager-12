"use strict";

const TASK_COUNT = 3;
const FILTER_ARRAY = [
  {
    name: `all`,
    text: `All`,
    value: 13,
    state: `checked`
  },
  {
    name: `overdue`,
    text: `Overdue`,
    value: 0
  },
  {
    name: `today`,
    text: `Today`,
    value: 0
  },
  {
    name: `favorites`,
    text: `Favorites`,
    value: 1
  },
  {
    name: `repeating`,
    text: `Repeating`,
    value: 1
  },
  {
    name: `archive`,
    text: `Archive`,
    value: 115
  }
];
const BUTTON_ARRAY = [
  {
    name: `edit`
  },
  {
    name: `archive`
  },
  {
    name: `favorites`,
    disabled: true
  }
];
const DAY_ARRAY = [
  {
    id: `repeat-mo-4`,
    value: `mo`
  },
  {
    id: `repeat-tu-4`,
    value: `tu`,
    state: `checked`
  },
  {
    id: `repeat-we-4`,
    value: `we`
  },
  {
    id: `repeat-th-4`,
    value: `th`
  },
  {
    id: `repeat-th-4`,
    value: `th`
  },
  {
    id: `repeat-fr-4`,
    value: `fr`,
    state: `checked`
  },
  {
    id: `repeat-sa-4`,
    value: `sa`
  },
  {
    id: `repeat-su-4`,
    value: `su`,
    state: `checked`
  }
];
const COLOR_ARRAY = [
  {
    id: `color-black-4`,
    value: `black`
  },
  {
    id: `color-yellow-4`,
    value: `yellow`,
    state: `checked`
  },
  {
    id: `color-blue-4`,
    value: `blue`
  },
  {
    id: `color-green-4`,
    value: `green`
  },
  {
    id: `color-pink-4`,
    value: `pink`
  }
];

const createSiteMenuTemplate = () => {
  return (
    `<section class="control__btn-wrap">
      <input
        type="radio"
        name="control"
        id="control__new-task"
        class="control__input visually-hidden"
      />
      <label for="control__new-task" class="control__label control__label--new-task"
        >+ ADD NEW TASK</label
      >
      <input
        type="radio"
        name="control"
        id="control__task"
        class="control__input visually-hidden"
        checked
      />
      <label for="control__task" class="control__label">TASKS</label>
      <input
        type="radio"
        name="control"
        id="control__statistic"
        class="control__input visually-hidden"
      />
      <label for="control__statistic" class="control__label"
        >STATISTICS</label
      >
    </section>`
  );
};

const createFilterItem = (name, text, count, state = '') => {
  return name ?
  (
    `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${count === 0 ? 'disabled' : state}
    />
    <label for="filter__${name}" class="filter__label">
    ${text} <span class="filter__${name}-count">${count}</span></label>`
  ) : ``;
}

const createFilterTemplate = (filters) => {
  filters = filters.reduce((accumulator, currentValue) => {
    return accumulator + createFilterItem(...Object.values(currentValue))
  }, ``);
  return (
    `<section class="main__filter filter container">
      ${filters}
    </section>`
  );
};

const createBoardTaskTemplate = () => {
  return (
    `<section class="board container">
      <div class="board__tasks">
      </div>
    </section>`
  );
};

const createSortingTemplate = () => {
  return (
    `<div class="board__filter-list">
        <a href="#" class="board__filter">SORT BY DEFAULT</a>
        <a href="#" class="board__filter">SORT BY DATE up</a>
        <a href="#" class="board__filter">SORT BY DATE down</a>
      </div>`
  );
};

const createTaskButton = (name, disabled = false) => {
  return (
    `<button type="button" class="card__btn card__btn--${name} ${disabled ? 'card__btn--disabled' : '' }">
      ${name}
    </button>`
  );
}

const createTaskTemplate = (buttons) => {
  buttons = buttons.reduce((accumulator, currentValue) => {
    return accumulator + createTaskButton(...Object.values(currentValue))
  }, ``);
  return (
    `<article class="card card--black">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            ${buttons}
          </div>
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          <div class="card__textarea-wrap">
            <p class="card__text">Example default task with default color.</p>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">23 September</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

const createTaskEditToggleButton = (name, text = name) => {
  return (
    `<button class="card__${name}-toggle" type="button">
      ${text}: <span class="card__${text}-status">yes</span>
    </button>`
  );
}

const createTaskEditDayButton = (id,  value, state = ``) => {
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
}

const createTaskEditColorButton = (id,  value, state = ``) => {
  return (
    `<input
      type="radio"
      id="${id}"
      class="card__color-input card__color-input--black visually-hidden"
      name="color"
      value="${value}"
      ${state}
    />
    <label
      for="${id}"
      class="card__color card__color--${value}"
      >
      ${value}
    </label>`
  );
}

const createTaskEditTemplate = (days, colors) => {

const dayToggle = createTaskEditToggleButton(`date-deadline`, `date`);
const repeatToggle = createTaskEditToggleButton(`repeat`);
days = days.reduce((accumulator, currentValue) => {
  return accumulator + createTaskEditDayButton(...Object.values(currentValue))
}, ``);
colors = colors.reduce((accumulator, currentValue) => {
  return accumulator + createTaskEditDayButton(...Object.values(currentValue))
}, ``);

  return (
    `<article class="card card--edit card--yellow card--repeat">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>
          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >This is example of task edit. You can set date and chose repeating days and color.</textarea>
            </label>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                ${dayToggle}
                <fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder=""
                      name="date"
                      value="23 September"
                    />
                  </label>
                </fieldset>
                ${repeatToggle}
                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                    ${days}
                  </div>
                </fieldset>
              </div>
            </div>
            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
               ${colors}
              </div>
            </div>
          </div>
          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

const createLoadMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(FILTER_ARRAY), `beforeend`);
render(siteMainElement, createBoardTaskTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);
render(boardElement, createSortingTemplate(), `afterbegin`);

const taskListElement = boardElement.querySelector(`.board__tasks`);
render(taskListElement, createTaskEditTemplate(DAY_ARRAY, COLOR_ARRAY), `beforeend`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, createTaskTemplate(BUTTON_ARRAY), `beforeend`);
}

render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);
