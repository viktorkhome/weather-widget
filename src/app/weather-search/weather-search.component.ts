import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, switchMap, debounceTime, throwError, catchError, of, distinctUntilChanged } from 'rxjs';
import { WeatherService } from '../services/weather.service';
import { ProfileService } from '../services/profile.service';
import { WeatherCity } from '../interfaces/weather-city.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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

  constructor(private weatherService: WeatherService, private profileService: ProfileService, 
    private snackBar: MatSnackBar) { }

  onSubmit(form: FormGroup) {
    this.weatherService.searchWeatherData(form.value.location)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        setTimeout(() => {
          this.snackBar.open(`City not found!`, 'Done', {
            duration: 100000,
            verticalPosition: "bottom",
            horizontalPosition: "center",
            panelClass: ["error-notification"]
          });
        });
        return throwError(() => of(error));
    }))
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

  onSearchLocation(cityName: string) {
    if (cityName.length > 0) {
      this.searchStream.next(cityName);
    }
  }

  public clearWeatherData() {
    this.weatherService.clearWeatherCities();
  }

  onSaveNew() {
    const cities = this.weatherService.getWeatherCities().map((el: WeatherCity) => el.cityname);
    this.profileService.saveNewProfile(cities);
  } 

  ngOnInit() {
    this.searchStream
    .pipe(
      debounceTime(700),
      distinctUntilChanged(),
      switchMap((input: string) => this.weatherService.searchWeatherData(input)),
      catchError((error: HttpErrorResponse) => {
        setTimeout(() => {
          this.snackBar.open(`City not found!`, 'Done', {
            duration: 100000,
            verticalPosition: "bottom",
            horizontalPosition: "center",
            panelClass: ["error-notification"]
          });
        });
        return throwError(() => of(error));
    }), untilDestroyed(this))
      .subscribe((data: any) => {
        this.data = data;
        return this.data;
    });
  }
}