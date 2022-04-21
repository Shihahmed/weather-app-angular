
import {Weather} from './Models/Weather';


export interface AppState {
  weather: Weather;
}

export const selectWeather = (state: AppState) => state.weather;
