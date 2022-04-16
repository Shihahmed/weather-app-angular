import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-day-card',
  templateUrl: './day-card.component.html',
  styleUrls: ['./day-card.component.css']
})
export class DayCardComponent implements OnInit {

  @Input() weather;

  constructor() { }

  ngOnInit(): void {
  }

  getDateFromRawDate(time): Date {

    return new Date(time * 1000);

  }

}
