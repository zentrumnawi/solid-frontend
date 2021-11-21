import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from './menu.model';
import { MenuActions } from './menu.actions';
import { RouterDataResolved } from '@ngxs/router-plugin';
import { HttpClient } from '@angular/common/http';
import { SolidCoreConfig, SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import { map } from 'lodash';

export interface MenuStateModel {
  items: MenuItem[];
}

// export type CategoryStateModel = SlideshowCategory[];

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

  constructor(
    router: Router,
    private store: Store,
    private _http: HttpClient,
    @Inject(SOLID_CORE_CONFIG) private _config: SolidCoreConfig
  ) {
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
        name: route.data?.name,
      });
    }
    setTimeout(() => this.store.dispatch(new MenuActions.SetEntries(items)));
  }

  @Action(MenuActions.SetEntries)
  public setEntries(
    { setState }: StateContext<MenuStateModel>,
    { items }: MenuActions.SetEntries
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
