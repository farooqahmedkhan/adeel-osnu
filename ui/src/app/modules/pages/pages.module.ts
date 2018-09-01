import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationsComponent } from './applications/applications.component';
import { TemplatesComponent } from './templates/templates.component';
import { ApplicationService } from './applications/application.service';
import { HttpClientModule } from '@angular/common/http';
import { TemplateService } from './templates/template.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [DashboardComponent, ApplicationsComponent, TemplatesComponent],
  exports: [
    DashboardComponent
  ],
  providers: [
    ApplicationService,
    TemplateService
  ]
})
export class PagesModule { }
