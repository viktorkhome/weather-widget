import { Component, OnInit, Input } from '@angular/core';
import { WeatherCity } from '../interfaces/weather-city.interface';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-city',
  templateUrl: './weather-city.component.html',
  styleUrls: ['./weather-city.component.css']
})
export class WeatherCityComponent implements OnInit {
  @Input() weatherCity!: WeatherCity;
  @Input() currentWeatherCity!: WeatherCity;
  weatherIconUrl: string = 'http://openweathermap.org/img/wn/';
  weatherIconSize: string = '@4x.png';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    console.log(this.weatherCity.icon);
  }

  removeCity(weatherCity: WeatherCity): void {
    this.weatherService.removeCity(weatherCity);
  }

}
