import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from './menu.model';
import { SetMenuEntries } from './menu.actions';
import { RouterDataResolved } from '@ngxs/router-plugin';

export interface MenuStateModel {
  items: MenuItem[];
}

const isActive = (routerUrl: string, routeUrl: string) =>
  routeUrl === ''
    ? routerUrl === '/'
    : routerUrl.substr(1).startsWith(routeUrl);

@State<MenuStateModel>({
  name: 'menu',
  defaults: {
    items: [],
  },
})
@Injectable()
export class MenuState {
  @Selector()
  public static getLandingItems(state: MenuStateModel): MenuItem[] {
    const filter = function (item: MenuItem) {
      return item.showOnLanding;
    };
    return state.items.filter(filter);
  }

  @Selector()
  public static getMenuItems(state: MenuStateModel): MenuItem[] {
    const filter = function (item: MenuItem) {
      return item.showInMenu;
    };
    return state.items.filter(filter);
  }

  constructor(router: Router, private store: Store) {
    const items: MenuItem[] = [];
    for (const route of router.config.sort(
      (a, b) => a.data?.order - b.data?.order
    )) {
      items.push({
        route: route.path || '',
        active: isActive(router.url, route.path || ''),
        title: route.data?.title,
        icon: route.data?.icon,
        svgIcon: route.data?.svgIcon,
        showInMenu: route.data?.showInMenu,
        showOnLanding: route.data?.showOnLandingPage,
      });
    }
    setTimeout(() => this.store.dispatch(new SetMenuEntries(items)));
  }

  @Action(SetMenuEntries)
  public setEntries(
    { setState }: StateContext<MenuStateModel>,
    { items }: SetMenuEntries
  ) {
    return setState({
      items: [...items],
    });
  }

  @Action(RouterDataResolved)
  public test(
    ctx: StateContext<MenuStateModel>,
    { event }: RouterDataResolved
  ) {
    const newUrl = event.urlAfterRedirects;
    const newItems = ctx.getState().items.map((item) => {
      return { ...item, active: isActive(newUrl, item.route) };
    });
    return ctx.patchState({
      items: newItems,
    });
  }
}
