import {createAction, props} from '@ngrx/store';
import {Weather} from '../Models/Weather';

export enum WeatherActionTypes {

  LoadWeather = '[Weather] Load Weather by city name',
  LoadWeatherByCoords = '[Weather] Load Load Weather by coords',
  LoadWeatherSuccess = '[Weather] Load Weather Success',
  LoadWeatherError = '[Weather] Load Weather Error',
}

export const LoadWeatherByCityName = createAction(WeatherActionTypes.LoadWeather, props<{cityName: string}>());

export const LoadWeatherByCoords = createAction(WeatherActionTypes.LoadWeatherByCoords, props<{lat: number, lon: number}>());

export const LoadWeatherSuccess = createAction(WeatherActionTypes.LoadWeatherSuccess, props<{weather: Weather}>());

export const LoadWeatherError = createAction(WeatherActionTypes.LoadWeatherError);


