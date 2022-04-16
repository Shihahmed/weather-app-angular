import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-sun-position',
  templateUrl: './sun-position.component.html',
  styleUrls: ['./sun-position.component.css']
})
export class SunPositionComponent implements OnChanges {

  @Input() sunriseTime: Date = new Date();
  @Input() currentTime: Date = new Date();
  @Input() sunsetTime: Date = new Date();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setSunPosition(this.sunriseTime, this.sunsetTime, this.currentTime);
  }

  setSunPosition(sunrise: Date, sunset: Date, curTime: Date): void {

    // console.log('setSunPosition');

    const sunPath = document.getElementById('sunPath');


    const sunPathL = 183;

    const dif = (+curTime - +sunrise) / (+sunset - +sunrise);


    const sunPosOnPath = sunPathL * dif;

    // @ts-ignore
    const point = sunPath.getPointAtLength(sunPosOnPath);

    // @ts-ignore
    document.getElementById('sunEl').style = 'transform: translate(' + point.x + 'px,' + point.y + 'px)';

  }

}
