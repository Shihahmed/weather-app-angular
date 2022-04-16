import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent{

  @Output() search = new EventEmitter<string>();

  public weatherSearchForm: FormGroup = new FormGroup({
    location: new FormControl(null),
  });

  constructor() { }

  searchEvent(): void{
    this.search.emit(this.weatherSearchForm.value.location);
  }

}
