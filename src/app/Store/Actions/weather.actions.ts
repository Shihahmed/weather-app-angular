import {Action, createAction, props} from '@ngrx/store';
import {WeatherFromOpenApi} from '../Models/WeatherFromOpenApi';

export enum WeatherActionTypes {

  LoadWeather = '[Weather] Load Weather by city name',
  LoadWeatherByCoords = '[Weather] Load Load Weather by coords',
  LoadWeatherSuccess = '[Weather] Load Weather Success',
  LoadWeatherError = '[Weather] Load Weather Error',
}


// export class LoadWeather implements Action {
//   readonly type = WeatherActionTypes.LoadWeather;
//   constructor(public payload: { cityName: string }) { }
// }
// export class LoadWeatherSuccess implements Action {
//   readonly type = WeatherActionTypes.LoadWeatherSuccess;
//
//   constructor(public payload: { weather: WeatherFromOpenApi }) { }
// }
// export class LoadWeatherError implements Action {
//   readonly type = WeatherActionTypes.LoadWeatherError;
// }


export const LoadWeatherByCityName = createAction(WeatherActionTypes.LoadWeather, props<{cityName: string}>());

export const LoadWeatherByCoords = createAction(WeatherActionTypes.LoadWeatherByCoords, props<{lat: number, lon: number}>());

export const LoadWeatherSuccess = createAction(WeatherActionTypes.LoadWeatherSuccess, props<{weather: WeatherFromOpenApi}>());

export const LoadWeatherError = createAction(WeatherActionTypes.LoadWeatherError);






//
// export type WeatherUnion =
//   | LoadWeather
//   | LoadWeatherSuccess
//   | LoadWeatherError;
