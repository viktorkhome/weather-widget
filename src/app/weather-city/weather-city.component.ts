import { Component, OnInit, Input } from '@angular/core';
import { WeatherCity } from '../interfaces/weather-city.interface';

@Component({
  selector: 'app-weather-city',
  templateUrl: './weather-city.component.html',
  styleUrls: ['./weather-city.component.css']
})
export class WeatherCityComponent implements OnInit {
  @Input() weatherCity!: WeatherCity;

  constructor() { }

  ngOnInit(): void {
  }

}
