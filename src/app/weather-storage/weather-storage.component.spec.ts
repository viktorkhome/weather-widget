import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherStorageComponent } from './weather-storage.component';

describe('WeatherStorageComponent', () => {
  let component: WeatherStorageComponent;
  let fixture: ComponentFixture<WeatherStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherStorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
