import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './Pages/weather/weather.component';
import { DatabaseService } from './Services/database/database.service';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SunPositionComponent } from './Pages/weather/sun-position/sun-position.component';
import { SearchInputComponent } from './Pages/weather/search-input/search-input.component';
import { DayCardComponent } from './Pages/weather/day-card/day-card.component';

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
    ReactiveFormsModule
  ],
  providers: [
    DatabaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
