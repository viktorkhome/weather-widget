import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, switchMap, debounceTime, distinctUntilChanged } from 'rxjs';
import { WeatherService } from '../services/weather.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})

export class WeatherSearchComponent implements OnInit {
  public location = new FormControl();
  private searchStream = new Subject<string>();
  data: any = {};

  locationGroup = new FormGroup({
    location: new FormControl()
  })

  constructor(private weatherService: WeatherService) { }

  onSubmit(e: Event, form: FormGroup) {
    this.weatherService.searchWeatherData(form.value.location)
    .subscribe((data: any) => {
      const weatherCity = { 
        cityname: data.name, 
        main: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        temp: data.main.temp,
        country: data.sys.country,
        wind_speed: data.wind.speed,
        wind_deg: data.wind.deg,
        wind_gust: data.wind.gust,
        feels_like: data.main.feels_like,
        grnd_level: data.main.grnd_level,
        sea_level: data.main.sea_level
      };
      this.weatherService.addCity(weatherCity);
    })
    form.reset();
    this.data !== '' ? this.data = {} : this.data;
  }

  onSearchLocation(event: Event, cityName: string) {
    if (cityName.length > 0) {
      this.searchStream.next(cityName);
    }
  }

  public clearWeatherData() {
    this.weatherService.clearWeatherCities();
  }

  ngOnInit() {
    this.searchStream
    .pipe(
      debounceTime(700),
      distinctUntilChanged(),
      switchMap((input: string) => this.weatherService.searchWeatherData(input))
    )
      .subscribe((data: any) => {
        this.data = data;
        return this.data;
    });
  }
}