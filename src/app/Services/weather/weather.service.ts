import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';
import {Weather} from '../../Store/Models/Weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  // openWeather parameters
  apiURL = 'https://api.openweathermap.org/data/2.5/';
  apiKey = '&appid=e541c593b2e9af7622c5b30b57f8a502';


  constructor(private http: HttpClient) {
  }

  getWeatherByCityName(city: string): Observable<Weather> {
    return this.http.get<any>(this.apiURL + 'weather?q=' + city + this.apiKey)
      .pipe(
        map(value => {
          return {
            cityName: value.name,
            lat: value.coord.lat,
            lon: value.coord.lon
          };
        }),
        retry(0),
        catchError(this.handleError)
      );
  }

  getWeatherByCoords(lat: number, lon: number): Observable<Weather> {
    if (lat && lon) {
      return this.http.get<any>(this.apiURL + 'weather?' + 'lat=' + lat + '&lon=' + lon + this.apiKey)
        .pipe(
          map(value => {
            return {
              cityName: value.name,
              lat: value.coord.lat,
              lon: value.coord.lon
            };
          }),
          retry(0),
          catchError(this.handleError)
        );
    }
    return new Observable<Weather>(null);
  }

  // oneCallApi by city name not available
  getOneCallWeatherByCoords(lat: number, lon: number): Observable<Weather> {

    if (lat && lon){
      return this.http.get<Weather>(this.apiURL + `onecall?lat=${lat ?? ''}&lon=${lon ?? ''}&exclude=hourly,minutely&units=metric${this.apiKey ?? ''}`)
        .pipe(
          map(value => {
            return this.weatherFromOneApiCallToWeather(value);
          }),
          retry(0),
        );
    }
    return new Observable<Weather>(null);

  }

  weatherFromOneApiCallToWeather(weatherFromOneApiCall: any): Weather {
    return {
      temp: weatherFromOneApiCall.current.temp.toFixed(0),
      description: weatherFromOneApiCall.current.weather[0].main,
      iconCode: weatherFromOneApiCall.current.weather[0].icon,
      date: this.getDateTimeFromRawDate(weatherFromOneApiCall.current.dt),
      sunriseDateTime: this.getDateTimeFromRawDate(weatherFromOneApiCall.current.sunrise),
      sunsetDateTime: this.getDateTimeFromRawDate(weatherFromOneApiCall.current.sunset),
      windDeg: weatherFromOneApiCall.current.wind_deg,
      windDirection: this.degToDirection(weatherFromOneApiCall.current.wind_deg),
      windSpeed_kmh: this.getWindSpeed_kmhFromRawWindSpeed(weatherFromOneApiCall.current.wind_speed),
      humidity: weatherFromOneApiCall.current.humidity,
      uvi: weatherFromOneApiCall.current.uvi,
      pressure_mmHg: this.getPressure_mmHgFromRawPressure(weatherFromOneApiCall.current.pressure),
      dailyWeather: weatherFromOneApiCall.daily.map((dailyWeather: any) => {
        return {
          date: this.getDateTimeFromRawDate(dailyWeather.dt),
          tempMax: dailyWeather.temp.max.toFixed(0),
          tempMin: dailyWeather.temp.min.toFixed(0),
          description: dailyWeather.weather[0].main,
          iconCode: dailyWeather.weather[0].icon,
          windSpeed_kmh: this.getWindSpeed_kmhFromRawWindSpeed(dailyWeather.wind_speed ),
          humidity: dailyWeather.humidity,
          uvi: dailyWeather.uvi,
          pressure_mmHg: this.getPressure_mmHgFromRawPressure(dailyWeather.pressure),
        };
      }),
    };
  }

  getDateTimeFromRawDate(time: number): Date {
    return new Date(time * 1000);
  }

  getPressure_mmHgFromRawPressure(rawPressure: number): number {
    return +(rawPressure * 0.75006375541921).toFixed(0);
  }


  getWindSpeed_kmhFromRawWindSpeed(rawWindSpeed: number): number {
    return +(rawWindSpeed * 3.6).toFixed(1);
  }

  degToDirection(deg: number): string {
    if (deg > 11.25 && deg < 33.75) {
      return 'nne';
    } else if (deg > 33.75 && deg < 56.25) {
      return 'ene';
    } else if (deg > 56.25 && deg < 78.75) {
      return 'e';
    } else if (deg > 78.75 && deg < 101.25) {
      return 'ese';
    } else if (deg > 101.25 && deg < 123.75) {
      return 'ese';
    } else if (deg > 123.75 && deg < 146.25) {
      return 'se';
    } else if (deg > 146.25 && deg < 168.75) {
      return 'sse';
    } else if (deg > 168.75 && deg < 191.25) {
      return 's';
    } else if (deg > 191.25 && deg < 213.75) {
      return 'sse';
    } else if (deg > 213.75 && deg < 236.25) {
      return 'se';
    } else if (deg > 236.25 && deg < 258.75) {
      return 'wsw';
    } else if (deg > 258.75 && deg < 281.25) {
      return 'w';
    } else if (deg > 281.25 && deg < 303.75) {
      return 'wnw';
    } else if (deg > 303.75 && deg < 326.25) {
      return 'nw';
    } else if (deg > 326.25 && deg < 348.75) {
      return 'nnw';
    } else {
      return 'n';
    }
  }

  handleError(error): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert('incorrect city name');
    return throwError(errorMessage);
  }



}


