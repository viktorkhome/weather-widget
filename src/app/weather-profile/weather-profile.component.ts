import { Component, OnInit } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { WeatherService } from '../services/weather.service';
import { ProfileService } from '../services/profile.service';
import { WeatherCity } from '../interfaces/weather-city.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, catchError, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-weather-profile',
  templateUrl: './weather-profile.component.html',
  styleUrls: ['./weather-profile.component.css']
})
export class WeatherProfileComponent implements OnInit {
  public currentWeatherCity!: WeatherCity;
  public profiles!: Profile[];

  constructor(private profileService: ProfileService, 
    private weatherService: WeatherService, private snackBar: MatSnackBar) {
  }

  getCurrentWeatherCity(): void {
    this.weatherService.getCurrentWeatherCity()
    .pipe(
      catchError((error: HttpErrorResponse) => {
        setTimeout(() => {
          this.snackBar.open(`City not found!`, 'Done', {
            duration: 100000,
            verticalPosition: "bottom",
            horizontalPosition: "center"
          });
        });
        return throwError(() => of(error));
    }), untilDestroyed(this))
    .subscribe((data: any) => {
      if (data) {
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
        this.currentWeatherCity = weatherCity;
      }
    });
  }

  ngOnInit() {
    this.getCurrentWeatherCity();
    this.profiles = this.profileService.getProfiles();
    this.profileService.isDataFetched.subscribe(() => {
      this.profiles = this.profileService.getProfiles();
    });
  }

  onLoadProfile(profile: Profile) {
    this.weatherService.clearWeatherCities();
    for(let i = 0; i < profile.cities.length; i++) {
      this.weatherService.searchWeatherData(profile.cities[i])
      .pipe(
        catchError((error: HttpErrorResponse) => {
          setTimeout(() => {
            this.snackBar.open(`${error.message}`, 'Done', {
              duration: 100000,
              verticalPosition: "bottom",
              horizontalPosition: "center"
            });
          });
          return throwError(() => of(error));
      }), untilDestroyed(this))
      .subscribe(
        (data: any) => {
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
        }
      )
    }
  }

  onDeleteProfile(index: number) {
    this.profileService.deleteProfile(index);
  }

}
