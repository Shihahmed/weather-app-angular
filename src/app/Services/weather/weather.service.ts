import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {WeatherFromOpenApi} from '../../Store/Models/WeatherFromOpenApi';
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

  getWeatherByCityName(city: string): Observable<any> {
    return this.http.get<any>(this.apiURL + 'weather?q=' + city + this.apiKey)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getWeatherByCoords(lat, lon): Observable<any> {
    return this.http.get<any>(this.apiURL + 'weather?' + 'lat=' + lat + '&lon=' + lon + this.apiKey)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // oneCallApi by city name not available
  getOneCallWeatherByCoords(lat: number, lon: number): Observable<any> {

    console.log(`getOneCallWeatherByCoords(${lat}, ${lon})`);
    if (lat && lon){
      return this.http.get<any>(this.apiURL + `onecall?lat=${lat ?? ''}&lon=${lon ?? ''}&exclude=hourly,minutely&units=metric${this.apiKey ?? ''}`)
        .pipe(
          retry(1),
          // catchError(this.handleError)
        );
    }
    return new Observable<any>(null);

  }

  getDateTimeFromRawDate(time: number): Date {
    return new Date(time * 1000);
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


