import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GlossaryComponent} from './components/glossary/glossary.component';
import {MainmenuComponent} from './components/mainmenu/mainmenu.component';
import {GlossaryService} from './services/glossary.service';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    GlossaryComponent,
    MainmenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      router: routerReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [GlossaryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
