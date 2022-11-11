export interface WeatherCity {
    cityname: string;
    main: string;
    description: string;
    icon: string;
    pressure: number;
    humidity: number;
    temp: number;
    country: string;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    feels_like: number;
    sea_level: number;
    grnd_level: number;
}