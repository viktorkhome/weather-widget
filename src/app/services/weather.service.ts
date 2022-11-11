import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject  } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { WeatherCity } from '../interfaces/weather-city.interface';
import { WEATHER_CITIES } from '../storage/storage';
import { MatSnackBar } from "@angular/material/snack-bar";
import { LocationService } from './location.service';
import { catchError, of, throwError, map, switchMap } from 'rxjs';
import { Position } from '../interfaces/position.interface';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private APPID: string = '2e7e1d8fabd7c153330e11d1f13782d9';
  private API_URL: string = 'https://api.openweathermap.org/data/2.5/weather?';
  public isDataFetched: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private _http: HttpClient, private snackBar: MatSnackBar, private locationService: LocationService) {
    this.loadFromLocalStorage();
  }

  public getWeatherCitiesFromStorage(): WeatherCity[] {
    const weatherCities = JSON.parse(localStorage.getItem('weather-cities') as string);
    return weatherCities;
  }

  getCurrentWeatherCity(): Observable<WeatherCity | null> {
    return this.locationService.getPosition()
      .pipe(
        switchMap((position: Position) => {
          if(position) {
            return this._http.get(`${this.API_URL}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${this.APPID}`)
            .pipe(
              map((response: any) => response as WeatherCity),
              catchError((error: HttpErrorResponse) => {
                return throwError(() => of(error));
              })
            )
          };
          return of(null);
        })
      );
  }

  searchWeatherData(cityName: string): Observable<any> {
    return this._http.get(this.API_URL + 'q=' + cityName + '&APPID=' + this.APPID + '&units=metric');
  }

  loadFromLocalStorage() {
    if (localStorage.getItem('weather-cities') === null || localStorage.getItem('weather-cities') === undefined) {
      this.snackBar.open("Cities not found!", 'Done', {
        duration: 2000,
        verticalPosition: "top",
        horizontalPosition: "center",
        panelClass: ["error-notification"]
      });
      const weatherCities = [
        {
          Cityname: 'Kyiv',
          description: 'RAINY',
          temperature: 32
        }
      ];
      localStorage.setItem('weather-cities', JSON.stringify(weatherCities));
    } else {
      setTimeout(() => {
        this.snackBar.open("Loading cities...", 'Done', {
          duration: 2000,
          verticalPosition: "bottom",
          horizontalPosition: "center" 
        });
      });
    }
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

  public removeCity(weatherCity: WeatherCity): void {
    WEATHER_CITIES.splice(WEATHER_CITIES.indexOf(weatherCity), 1);
    this.isDataFetched.next(true);
  }

}