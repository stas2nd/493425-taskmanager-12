import {isTaskRepeating, makeTemplateFromArray} from "../utils.js";
import {createTaskEditRepeatingDayTemplate} from "./task-edit-repeating-day.js";

export const createTaskEditRepeatingTemplate = (repeating) => {
  let days;
  if (isTaskRepeating(repeating)) {
    days = makeTemplateFromArray(createTaskEditRepeatingDayTemplate, Object.entries(repeating));
  }

  return (
    `<button class="card__repeat-toggle" type="button">
      repeat:<span class="card__repeat-status">${isTaskRepeating(repeating) ? `yes` : `no`}</span>
    </button>
    ${isTaskRepeating(repeating) ? `<fieldset class="card__repeat-days">
      <div class="card__repeat-days-inner">
        ${days}
      </div>
    </fieldset>` : ``}`
  );
};
