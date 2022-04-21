import {
  LoadWeatherByCityName,
  LoadWeatherSuccess,
  WeatherActionTypes,
  LoadWeatherError, LoadWeatherByCoords,
} from '../Actions/weather.actions';


import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {Weather} from '../Models/Weather';
import {forkJoin, of} from 'rxjs';
import {WeatherService} from '../../Services/weather/weather.service';
import {WeatherFromOpenApi} from '../Models/WeatherFromOpenApi';

@Injectable({providedIn: 'root'})
export class WeatherEffects {


  @Effect()
  loadWeatherByCityName$ = this.actions$.pipe(
    ofType(LoadWeatherByCityName),
    switchMap((action) => this.weatherService.getWeatherByCityName(action.cityName)),
    switchMap((weatherByCityName: any) => {
      // console.log('weatherByCityName', weatherByCityName);
        return this.weatherService.getOneCallWeatherByCoords(weatherByCityName.coord.lat, weatherByCityName.coord.lon).pipe(
          map((weather: WeatherFromOpenApi) => {
            // console.log('LoadWeatherSuccess', weather);
            weather.cityName = weatherByCityName.name;
            return weather;
          })
        );
    }),
    map((weatherFromOpenApi: WeatherFromOpenApi) => {
        // console.log('LoadWeatherSuccess', weatherFromOpenApi);
        return LoadWeatherSuccess({weather: weatherFromOpenApi});
    })
  );

  @Effect()
  loadWeatherByCoords$ = this.actions$.pipe(
    ofType(LoadWeatherByCoords),
    switchMap((action: any) => this.weatherService.getWeatherByCoords(action.lat, action.lon)),
    switchMap((weather: any) => {
      return this.weatherService.getOneCallWeatherByCoords(weather.coord.lat, weather.coord.lon).pipe(
        map(value => {
          value.cityName = weather.name;
          return value;
        })
      );
    }),
    map((weatherFromOpenApi: WeatherFromOpenApi) => {
      console.log(weatherFromOpenApi);
      return LoadWeatherSuccess({weather: weatherFromOpenApi});
    })
  );

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {
  }
}
