import {createTaskEditRepeatingTemplate} from "./task-edit-repeating.js";
import {createTaskEditColorButton} from "./task-edit-color-button.js";
import {createTaskEditDateTemplate} from "./task-edit-date.js";
import {makeTemplateFromArray} from "../utils.js";
import {isTaskExpired, isTaskRepeating} from "../utils.js";
import {NO_REPEATING} from "../const.js";

export const createTaskEditTemplate = (task = {}, colors) => {
  const {
    color = `black`,
    description = ``,
    dueDate = null,
    repeating = NO_REPEATING
  } = task;

  const deadlineClassName = isTaskExpired(dueDate)
    ? `card--deadline`
    : ``;

  const repeatingClassName = isTaskRepeating(repeating)
    ? `card--repeat`
    : ``;

  const date = createTaskEditDateTemplate(dueDate);
  const repeatingOption = createTaskEditRepeatingTemplate(repeating);
  colors = makeTemplateFromArray(createTaskEditColorButton, colors, {currentColor: color});

  return (
    `<article class="card card--edit card--${color} ${deadlineClassName} ${repeatingClassName}">
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
              >${description}</textarea>
            </label>
          </div>
          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                ${date}
                ${repeatingOption}
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
