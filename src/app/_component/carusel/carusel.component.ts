import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
declare const M;

@Component({
  selector: 'app-carusel',
  templateUrl: './carusel.component.html',
  styleUrls: ['./carusel.component.css']
})
export class CaruselComponent implements OnInit {

  constructor(
    private authService: AuthService, 
    public router: Router ) { }

  ngOnInit() {
    document.addEventListener('DOMContentLoaded', function() {
      M.AutoInit();  
     
      let elems = document.querySelector('.carousel.no-autoinit');
  
      let instances = M.Carousel.init(elems, this.options);
      
      })
  }

}
