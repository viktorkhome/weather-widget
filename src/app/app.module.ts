import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { WeatherCitiesComponent } from './weather-cities/weather-cities.component';
import { WeatherCityComponent } from './weather-city/weather-city.component';
import { WeatherSearchComponent } from './weather-search/weather-search.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherProfileComponent } from './weather-profile/weather-profile.component';
import { NotificationComponent } from './notification/notification.component';
import { MaterialModule } from './modules/material.module';

@NgModule({
  declarations: [
    AppComponent,
    WeatherCitiesComponent,
    WeatherCityComponent,
    WeatherSearchComponent,
    WeatherProfileComponent,
    NotificationComponent
  ],
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule
  ],
  providers: [],
  exports:[NotificationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
