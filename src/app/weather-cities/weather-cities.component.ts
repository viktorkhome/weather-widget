import { Component, OnInit } from '@angular/core';
import { WeatherCity } from '../interfaces/weather-city.interface';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-cities',
  templateUrl: './weather-cities.component.html',
  styleUrls: ['./weather-cities.component.css']
})
export class WeatherCitiesComponent implements OnInit {

  public weatherCitiesFromStorage!: WeatherCity[];
  public weatherCities: WeatherCity[] = [];

    constructor(private weatherService: WeatherService) {}

    getWeatherCities(){
      this.weatherCitiesFromStorage = this.weatherService.getWeatherCitiesFromStorage();
      this.weatherCities = this.weatherService.getWeatherCities();
      console.log('xaxaxa', this.weatherCities);
    }

    ngOnInit() {
       this.getWeatherCities();
       this.weatherService.isDataFetched.subscribe(() => {
        this.getWeatherCities();
      });
    }

}
