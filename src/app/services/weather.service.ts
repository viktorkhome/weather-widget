import { Injectable } from '@angular/core';
import { Init } from './init';
import { Observable, EMPTY, BehaviorSubject  } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { WeatherCity } from '../interfaces/weather-city.interface';
import { WEATHER_CITIES } from './init';

@Injectable({
  providedIn: 'root'
})
export class WeatherService extends Init {
  private APPID: string;
  private API_URL: string;
  public isDataFetched: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private _http: HttpClient) {
    super()
    console.log('Weather Items Service Init...');
    this.load();
    this.APPID = '2e7e1d8fabd7c153330e11d1f13782d9';
    this.API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  }

  public getWeatherCitiesFromStorage(): WeatherCity[] {
    const weatherCities = JSON.parse(localStorage.getItem('weather-cities') as string);
    return weatherCities;
  }

  public getWeatherCities(): WeatherCity[] {
    return WEATHER_CITIES;
  }

  clearWeatherCities(): void {
    WEATHER_CITIES.splice(0);
  }

  public addCity(weatherCity: WeatherCity): void {
    WEATHER_CITIES.push(weatherCity);
    this.isDataFetched.next(true);
  }

  searchWeatherData(cityName: string): Observable<any> {
    return this._http.get(this.API_URL + cityName + '&APPID=' + this.APPID + '&units=metric');
    // .pipe(
    //   map((response: any) => {
    //     console.log(response);
    //     return response.json();
    //   }),
    //   catchError(() => {
    //     return EMPTY;
    //   }),
    // );
  }
}