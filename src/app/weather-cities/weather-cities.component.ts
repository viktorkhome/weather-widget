import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherCity } from '../interfaces/weather-city.interface';
import { WeatherService } from '../services/weather.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable  } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-weather-cities',
  templateUrl: './weather-cities.component.html',
  styleUrls: ['./weather-cities.component.css']
})
export class WeatherCitiesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<WeatherCity>;
  public weatherCities: WeatherCity[] = [];

    constructor(private weatherService: WeatherService) {}

    getWeatherCities(){
      this.weatherCities = this.weatherService.getWeatherCities();
      this.dataSource =  new MatTableDataSource<WeatherCity>(this.weatherCities);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect()
    }

    ngOnInit() {
       this.getWeatherCities();
       this.weatherService.isDataFetched.subscribe(() => {
        this.getWeatherCities();
      });
    }

}
