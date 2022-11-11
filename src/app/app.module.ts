import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { WeatherCitiesComponent } from './weather-cities/weather-cities.component';
import { WeatherCityComponent } from './weather-city/weather-city.component';
import { WeatherSearchComponent } from './weather-search/weather-search.component';
import { WeatherStorageComponent } from './weather-storage/weather-storage.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    WeatherCitiesComponent,
    WeatherCityComponent,
    WeatherSearchComponent,
    WeatherStorageComponent
  ],
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
