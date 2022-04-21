import {
  LoadWeatherByCityName,
  LoadWeatherByCoords,
  LoadWeatherError,
  LoadWeatherSuccess,
} from '../Actions/weather.actions';
import {createReducer, on} from '@ngrx/store';
import {AppState} from '../index';



export const initialState: AppState = {
  weather: null,
};

export const weatherReducer = createReducer(
  initialState,
  on(LoadWeatherByCityName, (state, { cityName }) => ({ ...state  })),
  on(LoadWeatherByCoords, (state, { lat, lon }) => ({ ...state  })),
  on(LoadWeatherSuccess, (state, { weather }) => ({ ...state, weather })),
  on(LoadWeatherError, state => ({ ...state }),
));

