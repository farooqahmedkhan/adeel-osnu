import { LoginGuard } from '../auth/login.guard';
import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { TemplatesComponent } from '../pages/templates/templates.component';
import { ApplicationsComponent } from '../pages/applications/applications.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard]},  
  { path: 'applications', component: ApplicationsComponent, canActivate: [LoginGuard]},  
  { path: 'templates', component: TemplatesComponent, canActivate: [LoginGuard]},  
  { path: 'login', component: LoginComponent},
  { path: '', pathMatch: 'full', redirectTo: 'login'}
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true});
