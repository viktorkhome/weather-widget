import { Component, OnInit, Input } from '@angular/core';
import { WeatherCity } from '../interfaces/weather-city.interface';
import { WeatherService } from '../services/weather.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-weather-city',
  templateUrl: './weather-city.component.html',
  styleUrls: ['./weather-city.component.css'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('3s ease-out', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('3s ease-in', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class WeatherCityComponent implements OnInit {
  @Input() weatherCity!: WeatherCity;
  @Input() currentWeatherCity!: boolean;
  weatherIconUrl: string = 'http://openweathermap.org/img/wn/';
  weatherIconSize: string = '@4x.png';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  removeCity(weatherCity: WeatherCity): void {
    this.weatherService.removeCity(weatherCity);
  }

}
