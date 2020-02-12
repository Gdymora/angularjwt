import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { JwtModule } from '@auth0/angular-jwt';
import { DashboardComponent } from './_component/dashboard/dashboard.component';
import { LoginComponent } from './_component/login/login.component';
import { UserDashboardComponent } from './_component/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './_component/admin-dashboard/admin-dashboard.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CaruselComponent } from './_component/carusel/carusel.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,  
    DashboardComponent,
    LoginComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    FileUploadComponent,
    CaruselComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
    JwtModule.forRoot({
      config: {
       tokenGetter: tokenGetter,
       // whitelistedDomains: ['localhost'],//если на хосте с бекендом
       //https://github.com/auth0/angular2-jwt#using-a-custom-options-factory-function
       whitelistedDomains: ['angular.propan.top'],      
       blacklistedRoutes: ['localhost/auth/login']      
      }
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }