import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from 'src/app/Services/weather/weather.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {LoadWeatherByCityName, LoadWeatherByCoords} from '../../Store/Actions/weather.actions';
import {AppState, selectWeather} from '../../Store';
import {Current, WeatherFromOpenApi} from '../../Store/Models/WeatherFromOpenApi';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {


  public currentWeatherData: any;
  public dailyWeatherData: any;
  public cityName: string;

  public weather$: Observable<WeatherFromOpenApi>;
  public subscription: Subscription;

  public mainWeatherIconId = '01d';

  constructor(
    public weatherService: WeatherService,
    private store: Store
  ) {

    this.weather$ = this.store.select(selectWeather).pipe(
      map((value: any) => {
        return value.weather;
      })
    );

    this.subscription = this.weather$.subscribe((weather: WeatherFromOpenApi) => {
      if (weather) {
        this.currentWeatherData = weather.current;
        this.cityName = weather.cityName;
        this.dailyWeatherData = weather.daily;
        this.mainWeatherIconId = weather.current.weather[0].icon;
      }
    });


  }

  ngOnInit(): void {

    this.loadWeatherByUserLocation();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadWeatherByUserLocation(): void {
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((position) => {
        this.loadWeatherByCoords(position.coords.latitude, position.coords.longitude);
      });

    }

    if (this.currentWeatherData == null) {

      this.loadWeatherByCoords(42.8555011, 47.6239659); // Kaspiysk

    }
  }


  loadWeatherByCityName(cityName: string): void {
    this.store.dispatch(LoadWeatherByCityName({cityName}));
  }

  loadWeatherByCoords(lat: number, lon: number): void {
    this.store.dispatch(LoadWeatherByCoords({lat, lon}));
  }


}
