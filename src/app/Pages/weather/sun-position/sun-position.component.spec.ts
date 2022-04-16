import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SunPositionComponent } from './sun-position.component';

describe('SunPositionComponent', () => {
  let component: SunPositionComponent;
  let fixture: ComponentFixture<SunPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SunPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SunPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
