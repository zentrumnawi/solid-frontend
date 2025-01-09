import { StateContext, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { MenuItem } from './menu.model';
import { SetMenuEntries } from './menu.actions';
import { RouterDataResolved } from '@ngxs/router-plugin';
import { HttpClient } from '@angular/common/http';
import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import * as i0 from '@angular/core';
export interface MenuStateModel {
  items: MenuItem[];
}
export declare class MenuState {
  private store;
  private _http;
  private _config;
  private items;
  static getLandingItems(state: MenuStateModel): MenuItem[];
  static getMenuItems(state: MenuStateModel): MenuItem[];
  constructor(
    router: Router,
    store: Store,
    _http: HttpClient,
    _config: SolidCoreConfig
  );
  getItemsCount(): number;
  setEntries(
    { setState }: StateContext<MenuStateModel>,
    { items }: SetMenuEntries
  ): MenuStateModel;
  test(
    ctx: StateContext<MenuStateModel>,
    { event }: RouterDataResolved
  ): MenuStateModel;
  static ɵfac: i0.ɵɵFactoryDeclaration<MenuState, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<MenuState>;
}
