// login.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  model: any = {};

  public submitted: boolean = false;

  constructor(
    private authService: AuthService
  ) {}
 
  ngOnInit() {
    this.authService.logout();
  }
 
  login() {
    this.model.action = 'login';
    this.authService.loginForm(this.model).subscribe(response => {

      if (response.status === 'success') {
        this.authService.setUser(response);//семафорит в зависимости от типа
      }
      
    }, error => {
      console.error(error);
    });

  }
 
}
