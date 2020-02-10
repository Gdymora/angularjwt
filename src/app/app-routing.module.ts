import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { AuthAdminGuard } from './_guards/auth-admin.guard';
import { DashboardComponent } from './_component/dashboard/dashboard.component';
import { UserDashboardComponent } from './_component/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './_component/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './_component/login/login.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'user-dashboard',
    canActivate: [AuthGuard],
    component: UserDashboardComponent
  },

  {
    path: 'admin-dashboard',
    canActivate: [AuthAdminGuard],
    component: AdminDashboardComponent
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
