import {MenuItem, FilterType} from "../const.js";
import {render, remove} from "../utils/render.js";
import {UpdateType} from "../const.js";
import SiteMenuView from "../view/site-menu.js";
import StatisticsView from "../view/statistics.js";

export default class Menu {
  constructor(mainContainer, boardPresenter, tasksModel, filterModel) {
    this._mainContainer = mainContainer;
    this._headerContainer = this._mainContainer.querySelector(`.main__control`);

    this._boardPresenter = boardPresenter;
    this._tasksModel = tasksModel;
    this._filterModel = filterModel;

    this._statisticsComponent = null;

    this._siteMenuComponent = new SiteMenuView();
    this._handleSiteMenuClick = this._handleSiteMenuClick.bind(this);
    this._siteMenuComponent.setMenuClickHandler(this._handleSiteMenuClick);

    this._handleTaskNewFormClose = this._handleTaskNewFormClose.bind(this);
  }

  init() {
    render(this._headerContainer, this._siteMenuComponent);
  }

  _handleSiteMenuClick(menuItem) {
    switch (menuItem) {
      case MenuItem.ADD_NEW_TASK:
        remove(this._statisticsComponent);
        this._boardPresenter.destroy();
        this._filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
        this._boardPresenter.init();
        this._boardPresenter.createTask(this._handleTaskNewFormClose);
        this._siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = true;
        this._siteMenuComponent.getElement().querySelector(`[value=${MenuItem.STATISTICS}]`).disabled = true;
        break;
      case MenuItem.TASKS:
        this._boardPresenter.init();
        remove(this._statisticsComponent);
        break;
      case MenuItem.STATISTICS:
        this._boardPresenter.destroy();
        this._statisticsComponent = new StatisticsView(this._tasksModel.getTasks());
        render(this._mainContainer, this._statisticsComponent);
        break;
    }
  }

  _handleTaskNewFormClose() {
    this._siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = false;
    this._siteMenuComponent.getElement().querySelector(`[value=${MenuItem.STATISTICS}]`).disabled = false;
    this._siteMenuComponent.setMenuItem(MenuItem.TASKS);
  }
}
