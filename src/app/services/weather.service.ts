import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject  } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { WeatherCity } from '../interfaces/weather-city.interface';
import { WEATHER_CITIES } from '../storage/storage';
import { LocationService } from './location.service';
import { catchError, of, throwError, map, switchMap } from 'rxjs';
import { Position } from '../interfaces/position.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private APPID: string = '2e7e1d8fabd7c153330e11d1f13782d9';
  private API_URL: string = 'https://api.openweathermap.org/data/2.5/weather?';
  public isDataFetched: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private _http: HttpClient, private locationService: LocationService, private snackBar: MatSnackBar) {}

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

  public getWeatherCities(): WeatherCity[] {
    return WEATHER_CITIES;
  }

  public clearWeatherCities(): void {
    WEATHER_CITIES.splice(0);
    this.isDataFetched.next(true);
  }

  public addCity(weatherCity: WeatherCity): void {
    const filteredCity = WEATHER_CITIES.filter((city: WeatherCity) => city.cityname === weatherCity.cityname)[0];
    if (filteredCity) { 
      this.snackBar.open("City is already in list!", 'Done', {
        duration: 2000,
        verticalPosition: "top",
        horizontalPosition: "center"
      });
      return;
    }
    WEATHER_CITIES.push(weatherCity);
    this.isDataFetched.next(true);
  }

  public removeCity(weatherCity: WeatherCity): void {
    WEATHER_CITIES.splice(WEATHER_CITIES.indexOf(weatherCity), 1);
    this.isDataFetched.next(true);
  }

}