// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import {WeatherService } from '../../_services/weather.service';
import { Policy } from  '../../_models/policy';
 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  
  policies: Policy[]
  constructor(    
    private apiService: ApiService,
    private weatherService: WeatherService
  ) { }


   modelWeather:any = {
      main:{
         temp:null
      }
    }

  ngOnInit() {    
    this.apiService.indexPolicies().subscribe(response=>{        
        this.policies = response['data'];      
    }); 
    
    this.getPosition(); 
  }

  sortLowering(idelement:any){    
  //понижение
    for(var i = 0;i < idelement.length; i++){
      idelement.sort((n1,n2) => {
        if (n1.price > n2.price) {
            return -1;
        }
    
        if (n1.price < n2.price) {
            return 1;
        }    
        return 0;
    });
       
     } 
     this.policies=idelement;
     console.log(idelement);
      
    }

    sortIncrease(idelement:any){    
  
      for(var i = 0;i < idelement.length; i++){
        idelement.sort((n1,n2) => {
          if (n1.price > n2.price) {
              return 1;
          }
      
          if (n1.price < n2.price) {
              return -1;
          }    
          return 0;
      });
         
       } 
       this.policies=idelement;
       console.log(idelement);
        
      }

  public getPosition() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
               console.log(position.coords.latitude)
               console.log(position.coords.longitude) 
              this.weatherService.indexWeather(position.coords.latitude,position.coords.longitude).subscribe(response=>{        
                this.modelWeather = response; 
                //($f-32)*(5/9)
                //https://openweathermap.org/api
                console.log( response)  
                 console.log( this.modelWeather.main.temp)     
            }); 
               
          },
          error => {
              switch (error.code) {
                  case 1:
                      console.log('Permission Denied');
                      break;
                  case 2:
                      console.log('Position Unavailable');
                      break;
                  case 3:
                      console.log('Timeout');
                      break;
              }
          }
      );
  };
    
  }

  
 
}
