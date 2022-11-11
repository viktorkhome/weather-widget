export class Init {
    load() {
      if (localStorage.getItem('weather-cities') === null || localStorage.getItem('weather-cities') === undefined) {
        console.log('Weather cities not found!!!');
        const weatherCities = [
          {
            Cityname: 'London',
            description: 'RAINY',
            temperature: 32
          },
          {
            Cityname: 'Mexico City',
            description: 'CLOUDY',
            temperature: 30
          },
          {
            Cityname: 'New York',
            description: 'SUNNY',
            temperature: 28
          }
        ];
        localStorage.setItem('weather-cities', JSON.stringify(weatherCities));
      } else {
        console.log('Loading cities..');
      }
    }
  }
  
  import { WeatherCity } from '../interfaces/weather-city.interface';
  
  export const WEATHER_CITIES : WeatherCity[] = []