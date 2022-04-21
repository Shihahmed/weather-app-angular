import {
  ActionReducerMap,
  createFeatureSelector, createReducer,
  createSelector, on,
} from '@ngrx/store';

import * as weather from './Reducers/weather.reducers';
import {WeatherFromOpenApi} from './Models/WeatherFromOpenApi';
import {WeatherActionTypes} from './Actions/weather.actions';

// export interface State {
//   weather: weather.State;
// }
//
// export const initialState: State = {
//   weather: null
// };
//
//
// export const reducers: ActionReducerMap<State> = {
//   weather: weather.reducer,
// };
//
// const selectWeather = (state: State) => state.weather;

// export interface WeatherState {
//   weather: WeatherFromOpenApi;
// }

export interface AppState {
  weather: WeatherFromOpenApi;
}

// export const getAppState = createFeatureSelector<AppState>('wholeApp');

// export const getAppState = (state: AppState) => state.weatherState;
// export const selectFeature = createFeatureSelector<AppState>('weatherState');

export const selectWeather = (state: AppState) => state.weather;
// export const selectWeather = createSelector(
//   selectFeature,
//   (state: WeatherState) => state
// );

// export const selectWeather = createSelector(
//   selectFeature,
//   (state: AppState) => state
// );
//
// export interface AppState {
//   weatherState: WeatherState;
// }
//
// export const reducers: ActionReducerMap<WeatherState> = {
//   weather: weather.reducer,
// };
//
// export const selectWeather = (state: AppState) => state.weatherState;

