import {Component, OnInit} from '@angular/core';
import {DatabaseService} from 'src/app/Services/database/database.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {


  public currentWeatherData: any;
  public dailyWeatherData: any;
  public cityName: string;

  public mainWeatherIconId = '01d';

  // public displayData: boolean;

  constructor(
    private databaseService: DatabaseService
  ) {
  }

  ngOnInit(): void {

    this.getUserLocation();
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.getOneCallWeatherByCoords(position.coords.latitude, position.coords.longitude);
      });
    }

    if (this.currentWeatherData == null) {

      this.getOneCallWeatherByCoords(42.8555011, 47.6239659); // Kaspiysk

    }
  }


  getOneCallWeatherByCityName(cityName): boolean {

    this.databaseService.getWeatherByCityName(cityName).subscribe((data: any) => {
      this.cityName = data.name;
      this.getOneCallWeatherByCoords(data.coord.lat, data.coord.lon);
    });
    return true;
  }

  getOneCallWeatherByCoords(lat: number, lon: number): void {

    this.databaseService.getOneCallWeatherByCoords(lat, lon).subscribe((data: {}) => {

      const dataBuffer: any = data;
      this.getCityNameByCords(lat, lon);
      this.currentWeatherData = dataBuffer.current;
      this.dailyWeatherData = dataBuffer.daily;
      this.mainWeatherIconId = dataBuffer.current.weather[0].icon;

    });

  }


  getCityNameByCords(lat: number, lon: number): void {

    this.databaseService.getWeatherByCoords(lat, lon).subscribe((data: any) => {

      this.cityName = data.name;

    });

  }


  getTimeFromRawDate(time: number): Date {
    return new Date(time * 1000);
  }

  getDateFromRawDate(time): Date {
    return new Date(time * 1000);
  }


  degToCard(deg: number): string {
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


}
