import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AppListComponent } from './app-list/app-list.component';
import { AppItemComponent } from './app-item/app-item.component';
import { ApplicationDetailModalComponent } from './modals/application-detail-modal/application-detail-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationEditModalComponent } from './modals/application-edit-modal/application-edit-modal.component';
import { TemplateDetailModalComponent } from './modals/template-detail-modal/template-detail-modal.component';
import { TemplateEditModalComponent } from './modals/template-edit-modal/template-edit-modal.component';
import { SpinningComponent } from './modals/spinning/spinning.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [NavbarComponent, AppListComponent, AppItemComponent, ApplicationDetailModalComponent, ApplicationEditModalComponent, TemplateDetailModalComponent, TemplateEditModalComponent, SpinningComponent],
  exports: [
    NavbarComponent,
    ReactiveFormsModule
  ],
  entryComponents: [
    ApplicationDetailModalComponent,
    ApplicationEditModalComponent,
    TemplateDetailModalComponent,
    TemplateEditModalComponent,
    SpinningComponent
  ]
})
export class SharedModule { }
