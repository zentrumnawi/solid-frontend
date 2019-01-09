import {OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

export abstract class BaseComponent implements OnInit, OnDestroy {
  private _onInit: (() => void)[] = [];
  private _onDestroy: (() => void)[] = [];
  private _subs: Subscription[] = [];

  public ngOnDestroy(): void {
    this._onDestroy.forEach(cb => cb());
  }

  public ngOnInit(): void {
    this._onInit.forEach(cb => cb());
  }

  protected addOnInit(...callbacks: (() => void)[]) {
    this._onInit.push(...callbacks);
  }

  protected addOnDestroy(...callbacks: (() => void)[]) {
    this._onDestroy.push(...callbacks);
    this._subs.forEach(sub => sub.unsubscribe());
  }

  protected addSub(...subscriptions: Subscription[]) {
    this._subs.push(...subscriptions);
  }

}
