import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';

declare const M;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
 
  constructor(
    private authService: AuthService, 
    private router: Router 
  ) {

    
   }
  title = 'барахолка';

  options = {
            fullWidth: true,
            indicators: true
         };

  ngOnInit() {   
    
        
        document.addEventListener('DOMContentLoaded', function() {
        
          var elems = document.querySelectorAll('.sidenav');
          var instances = M.Sidenav.init(elems, this.options);
        });
        
        document.addEventListener('DOMContentLoaded', function() {
        M.AutoInit();  
       
        let elems = document.querySelector('.carousel.no-autoinit');
    
        let instances = M.Carousel.init(elems, this.options);
        
        })
        


  }
  rout(){
    this.router.navigate(['']);
    console.log(this.router.navigate(['']));
  }

  logout(){
    this.authService.logout();
  }
}
