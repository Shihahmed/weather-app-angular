import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Weather} from '../Models/Weather';
import {
  LoadWeatherByCityName,
  LoadWeatherByCoords,
  LoadWeatherError,
  LoadWeatherSuccess,
  WeatherActionTypes
} from '../Actions/weather.actions';
import {createReducer, on} from '@ngrx/store';
import {WeatherFromOpenApi} from '../Models/WeatherFromOpenApi';
import {AppState} from '../index';

// export const adapter: EntityAdapter<WeatherFromOpenApi> = createEntityAdapter<WeatherFromOpenApi>({});

// export interface State{
//   weather: WeatherFromOpenApi;
// }

export const initialState: AppState = {
  weather: null,
};

// export const reducer = (
//   state: WeatherState = initialState,
//   action: WeatherActionTypes
// ) => {
//   switch (action.type) {
//
//     case WeatherActionTypes.LoadWeather:
//       return {...state, weather: state.weather, pending: true};
//
//     case WeatherActionTypes.LoadWeatherSuccess:
//       console.log('case WeatherActionTypes.LoadWeatherSuccess:', state);
//       return {...state, weather: action.payload.weather, pending: false};
//
//     case WeatherActionTypes.LoadWeatherError:
//       return {...state, pending: false};
//
//     default:
//       return state;
//   }
// };

export const weatherReducer = createReducer(
  initialState,
  on(LoadWeatherByCityName, (state, { cityName }) => ({ ...state  })),
  on(LoadWeatherByCoords, (state, { lat, lon }) => ({ ...state  })),
  on(LoadWeatherSuccess, (state, { weather }) => ({ ...state, weather })),
  on(LoadWeatherError, state => ({ ...state }),
));

// export const scoreboardReducer = createReducer(
//   initialState,
//   on(WeatherActionTypes.LoadWeather, state => ({ ...state, home: state.we })),
//   on(ScoreboardPageActions.awayScore, state => ({ ...state, away: state.away + 1 })),
//   on(ScoreboardPageActions.resetScore, state => ({ home: 0, away: 0 })),
//   on(ScoreboardPageActions.setScores, (state, { game }) => ({ home: game.home, away: game.away }))
// );

// export const selectWeatherEntity = selectEntities;
