import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/Services/database/database.service';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {


  public weatherSearchForm: FormGroup;

  public currentWeatherData: any;
  public dailyWeatherData: any;
  public cityName: string;

  public mainWeatherIconId = '01d';
  
  public displayData:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public databaseService: DatabaseService

  ) { }

  ngOnInit(): void {
    
    this.getUserLocation();


    this.weatherSearchForm = this.formBuilder.group({
      location: [""]
    });

  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.getOneCallWeatherByCoords(position.coords.latitude, position.coords.longitude);
      });
    } 

    if(this.currentWeatherData == null){

      this.getOneCallWeatherByCoords(42.8555011, 47.6239659);//Kaspiysk
      
    }
  }



  getCurrentWeatherByCityName(cityName) {

    this.databaseService.getWeatherByCityName(cityName).subscribe((data: {}) => {
      this.currentWeatherData = data;
    });

    

  }


  getOneCallWeatherByCityName(cityName):boolean {
    
    this.databaseService.getWeatherByCityName(cityName).subscribe((data: any) => {
      this.cityName = data.name;
      this.getOneCallWeatherByCoords(data.coord.lat, data.coord.lon);
    });
    return true;
  }

  getOneCallWeatherByCoords(lat, lon) {

    return this.databaseService.getOneCallWeatherByCoords(lat, lon).subscribe((data: {}) => {

      let dataBuffer: any = data;
      this.setSityNameFromCoords(lat, lon);
      this.currentWeatherData = dataBuffer.current;
      this.dailyWeatherData = dataBuffer.daily;
      this.mainWeatherIconId = dataBuffer.current.weather[0].icon;
      this.calculateSunPosition(dataBuffer.current?.sunrise, dataBuffer.current?.sunset, dataBuffer.current?.dt);

    });

  }


  setSityNameFromCoords(lat, lon) {

    this.databaseService.getWeatherByCoords(lat, lon).subscribe((data: any) => {

      this.cityName = data.name;

    });;

  }


  getTimeFromRawDate(time: number): string {

    let fullData = new Date(time * 1000);

    return (fullData.getHours() < 10 ? ('0' + fullData.getHours()) : fullData.getHours()) + ':' + (fullData.getMinutes() < 10 ? ('0' + fullData.getMinutes()) : fullData.getMinutes());

  }

  getDateFromRawDate(time): string {


    let fullData = new Date(time * 1000);

    return (fullData.getDate() < 10 ? ('0' + fullData.getDate()) : fullData.getDate()) + '.' + ((fullData.getMonth() + 1) < 10 ? ('0' + (fullData.getMonth() + 1)) : (fullData.getMonth() + 1));

  }

  calculateSunPosition(rawSunrise, rawSunset, rawCurTime) {


      let sunrise = new Date(rawSunrise * 1000);
      let sunset = new Date(rawSunset * 1000);
      let curTime = new Date(rawCurTime * 1000);

      let sunPath = document.getElementById('sunPath');


      let sunPathL = 183;

      // @ts-ignore
      let dif = (curTime - sunrise) / (sunset - sunrise);

      
      let sunPosOnPath = sunPathL * dif;

      // @ts-ignore
      let point = sunPath.getPointAtLength(sunPosOnPath);

      // @ts-ignore
      document.getElementById('sunEl').style = 'transform: translate(' + point.x + 'px,' + point.y + 'px)';
    
  }

  hideWeatherElements(){
    if(this.cityName.length<0){

    }
  }

  degToCard(deg) {
    if (deg > 11.25 && deg < 33.75) {
      return "nne";
    } else if (deg > 33.75 && deg < 56.25) {
      return "ene";
    } else if (deg > 56.25 && deg < 78.75) {
      return "e";
    } else if (deg > 78.75 && deg < 101.25) {
      return "ese";
    } else if (deg > 101.25 && deg < 123.75) {
      return "ese";
    } else if (deg > 123.75 && deg < 146.25) {
      return "se";
    } else if (deg > 146.25 && deg < 168.75) {
      return "sse";
    } else if (deg > 168.75 && deg < 191.25) {
      return "s";
    } else if (deg > 191.25 && deg < 213.75) {
      return "sse";
    } else if (deg > 213.75 && deg < 236.25) {
      return "se";
    } else if (deg > 236.25 && deg < 258.75) {
      return "wsw";
    } else if (deg > 258.75 && deg < 281.25) {
      return "w";
    } else if (deg > 281.25 && deg < 303.75) {
      return "wnw";
    } else if (deg > 303.75 && deg < 326.25) {
      return "nw";
    } else if (deg > 326.25 && deg < 348.75) {
      return "nnw";
    } else {
      return "n";
    }
  }



}
