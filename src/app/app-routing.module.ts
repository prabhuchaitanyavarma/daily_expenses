import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
	{path: '', redirectTo: '/login', pathMatch: 'full'},
	{ path: 'login', component: LoginComponent },
	{ path: 'expenses', component: HomeComponent, canActivate: [AuthGuardService] },
	{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
