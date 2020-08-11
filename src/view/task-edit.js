import TaskEditRepeatingView from "./task-edit-repeating.js";
import TaskEditColorButtonView from "./task-edit-color-button.js";
import TaskEditDateView from "./task-edit-date.js";
import {makeTemplateFromArrayClass} from "../utils.js";
import {isTaskExpired, isTaskRepeating, createElement} from "../utils.js";
import {BLANK_TASK, COLORS} from "../const.js";

const createTaskEditTemplate = (task) => {
  const {color, description, dueDate, repeating} = task;

  const deadlineClassName = isTaskExpired(dueDate)
    ? `card--deadline`
    : ``;

  const repeatingClassName = isTaskRepeating(repeating)
    ? `card--repeat`
    : ``;

  const date = new TaskEditDateView(dueDate).getTemplate();
  const repeatingOption = new TaskEditRepeatingView(repeating).getTemplate();
  const colors = makeTemplateFromArrayClass(TaskEditColorButtonView, COLORS, {currentColor: color});

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

export default class TaskEdit {
  constructor(task = BLANK_TASK) {
    this._task = task;
    this._element = null;
  }

  getTemplate() {
    return createTaskEditTemplate(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
