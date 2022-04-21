import {
  LoadWeatherByCityName,
  LoadWeatherSuccess,
  LoadWeatherByCoords,
} from '../Actions/weather.actions';


import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {Weather} from '../Models/Weather';
import {forkJoin, of} from 'rxjs';
import {WeatherService} from '../../Services/weather/weather.service';

@Injectable({providedIn: 'root'})
export class WeatherEffects {


  @Effect()
  loadWeatherByCityName$ = this.actions$.pipe(
    ofType(LoadWeatherByCityName),
    switchMap((action) => this.weatherService.getWeatherByCityName(action.cityName)),
    switchMap((weatherByCityName: Weather) => {
      return this.weatherService.getOneCallWeatherByCoords(weatherByCityName.lat, weatherByCityName.lon).pipe(
        map((weather: Weather) => {
          weather.cityName = weatherByCityName.cityName;
          return weather;
        })
      );
    }),
    map((weatherFromOpenApi: Weather) => {
      return LoadWeatherSuccess({weather: weatherFromOpenApi});
    })
  );


  @Effect()
  loadWeatherByCoords$ = this.actions$.pipe(
    ofType(LoadWeatherByCoords),
    switchMap((action: any) => this.weatherService.getWeatherByCoords(action.lat, action.lon)),
    switchMap((weather: Weather) => {
      return this.weatherService.getOneCallWeatherByCoords(weather.lat, weather.lon).pipe(
        map(value => {
          value.cityName = weather.cityName;
          return value;
        })
      );
    }),
    map((weatherFromOpenApi: Weather) => {
      return LoadWeatherSuccess({weather: weatherFromOpenApi});
    })
  );

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {
  }
}
