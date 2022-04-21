import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from '../../../Services/weather/weather.service';
import {Weather} from '../../../Store/Models/Weather';

@Component({
  selector: 'app-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.css']
})
export class DayCardComponent implements OnInit {

  @Input() weather: Weather;

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
  }

}
