import {makeTemplateFromArray} from "../main.js";
import {createTaskButton} from "./task-button.js";

export const createTaskTemplate = (buttons) => {
  buttons = makeTemplateFromArray(buttons, createTaskButton);
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
