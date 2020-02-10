import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  PHP_API_SERVER = "http://angular.propan.top";

  constructor(private httpClient: HttpClient) { }

  indexWeather(lat:number,lon:number) {
    return this.httpClient.get(`${this.PHP_API_SERVER}/weather/index.php?lat=${lat}&lon=${lon}`);
  }

}