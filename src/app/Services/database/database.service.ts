import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  //openWeather parametrs
  apiURL = 'https://api.openweathermap.org/data/2.5/';
  apiKey: string = "&appid=e541c593b2e9af7622c5b30b57f8a502";


  constructor(private http: HttpClient) { }


  getWeatherByCityName(city: string): Observable<any> {
    return this.http.get<any>(this.apiURL + 'weather?q=' + city + this.apiKey)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getWeatherByCoords(lat, lon): Observable<any> {
    return this.http.get<any>(this.apiURL + 'weather?' + 'lat=' +lat+'&lon='+lon+this.apiKey)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  //oneCallApi by city name not available
  getOneCallWeatherByCoords(lat,lon): Observable<any>{
    return this.http.get<any>(this.apiURL+'onecall?lat='+lat+'&lon='+lon+'&exclude=hourly,minutely'+'&units=metric'+this.apiKey)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }
  
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(errorMessage);
  }


}


