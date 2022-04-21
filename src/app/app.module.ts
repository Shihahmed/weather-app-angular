import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './Pages/weather/weather.component';
import { WeatherService } from './Services/weather/weather.service';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SunPositionComponent } from './Pages/weather/sun-position/sun-position.component';
import { SearchInputComponent } from './Pages/weather/search-input/search-input.component';
import { DayCardComponent } from './Pages/weather/day-card/day-card.component';
// import {reducers} from './Store';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {WeatherEffects} from './Store/Effects/weather.effects';
import {weatherReducer} from './Store/Reducers/weather.reducers';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    SunPositionComponent,
    SearchInputComponent,
    DayCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({weather: weatherReducer}),
    EffectsModule.forRoot([WeatherEffects]),
  ],
  providers: [
    WeatherService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
