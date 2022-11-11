import { Component, OnInit } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { WeatherService } from '../services/weather.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-weather-profile',
  templateUrl: './weather-profile.component.html',
  styleUrls: ['./weather-profile.component.css']
})
export class WeatherProfileComponent implements OnInit {

  public profiles!: Profile[];

  constructor(private profileService: ProfileService, private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.profiles = this.profileService.getProfiles();
  }

  onSaveNew() {
      const cities = this.weatherService.getWeatherCities().map((el: any) => el.cityName);
      this.profileService.saveNewProfile(cities);
  }

  onLoadProfile(profile: Profile) {
    this.weatherService.clearWeatherCities();
    for(let i = 0; i < profile.cities.length; i++) {
      this.weatherService.searchWeatherData(profile.cities[i])
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

  onDeleteProfile(e: Event, profile: Profile) {
    e.stopPropagation();
    this.profileService.deleteProfile(profile);
  }

}
