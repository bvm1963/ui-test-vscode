import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';

// Add the RxJS Observable operators we need in this app.
import './rxjs-extensions';

import {
		ConfigService,
		CommonService
} from './infrastructure/index';

import { AppComponent } from './app.component';
import { DefaultPageComponent, MainPageComponent } from './areas/main/index';

import { MainModule } from './areas/main/index';
import { UiModule } from './areas/ui/index';
import { ExamplesModule } from './areas/examples/index';
import { AboutModule } from './areas/about/index';

@NgModule({
  declarations: [
    AppComponent,
    DefaultPageComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MainModule,
    UiModule,
    ExamplesModule,
    AboutModule
  ],
  providers: [
    ConfigService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
