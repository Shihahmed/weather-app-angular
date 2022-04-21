import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from 'src/app/Services/weather/weather.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {LoadWeatherByCityName, LoadWeatherByCoords} from '../../Store/Actions/weather.actions';
import {AppState, selectWeather} from '../../Store';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Weather} from '../../Store/Models/Weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  public weather$: Observable<Weather>;

  constructor(
    private store: Store
  ) {

    this.loadWeatherByCoords(42.8555011, 47.6239659); // Kaspiysk

    this.weather$ = this.store.select(selectWeather).pipe(
      map((value: any) => {
        return value.weather;
      })
    );

  }

  ngOnInit(): void {

    this.loadWeatherByUserLocation();
  }

  loadWeatherByUserLocation(): void {
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((position) => {
        this.loadWeatherByCoords(position.coords.latitude, position.coords.longitude);
      });

    }
  }

  loadWeatherByCityName(cityName: string): void {
    this.store.dispatch(LoadWeatherByCityName({cityName}));
  }

  loadWeatherByCoords(lat: number, lon: number): void {
    this.store.dispatch(LoadWeatherByCoords({lat, lon}));
  }


}
