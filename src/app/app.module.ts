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
import {InfoComponent} from './components/info/info.component';
import {MainmenuComponent} from './components/mainmenu/mainmenu.component';
import {glossaryReducer} from './reducers/glossary.reducer';
import {GlossaryService} from './services/glossary.service';
import {TitleService} from './services/title.service';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    GlossaryComponent,
    MainmenuComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      glossary: glossaryReducer,
      router: routerReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    GlossaryService,
    TitleService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
