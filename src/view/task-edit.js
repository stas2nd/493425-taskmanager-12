import {makeTemplateFromArray} from "../main.js";
import {createTaskEditToggleButton} from "./task-edit-toggle-button.js";
import {createTaskEditDayButton} from "./task-edit-day-button.js";
import {createTaskEditColorButton} from "./task-edit-color-button.js";

export const createTaskEditTemplate = (dayButton, repeatButton, days, colors) => {

  const dayToggle = createTaskEditToggleButton(dayButton);
  const repeatToggle = createTaskEditToggleButton(repeatButton);
  days = makeTemplateFromArray(days, createTaskEditDayButton);
  colors = makeTemplateFromArray(colors, createTaskEditColorButton);

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
