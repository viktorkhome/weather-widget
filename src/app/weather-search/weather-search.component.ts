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
      const weatherCity = { cityName: data.name, description: data.weather[0].description, temperature: data.main.temp };
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
        console.log(this.data);
        return this.data;
    });
  }
}