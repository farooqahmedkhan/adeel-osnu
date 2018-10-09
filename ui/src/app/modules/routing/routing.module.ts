import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ApplicationsComponent } from '../pages/applications/applications.component';
import { TemplatesComponent } from '../pages/templates/templates.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},  
  { path: 'applications', component: ApplicationsComponent},  
  { path: 'templates', component: TemplatesComponent},  
  { path: '', pathMatch: 'full', redirectTo: 'dashboard'}
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true});
