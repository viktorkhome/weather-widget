import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherProfileComponent } from './weather-profile.component';

describe('WeatherProfileComponent', () => {
  let component: WeatherProfileComponent;
  let fixture: ComponentFixture<WeatherProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
