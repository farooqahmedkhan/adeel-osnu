import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../../core/models/application.model';
import { ApplicationService } from './application.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationDetailModalComponent } from '../../shared/modals/application-detail-modal/application-detail-modal.component';
import { ApplicationEditModalComponent } from '../../shared/modals/application-edit-modal/application-edit-modal.component';
import { UiService } from '../../core/services/ui.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  private modal: NgbModalRef;
  applications: Observable<Application[]>;
  private _requestParameters: string[] = [];

  constructor(private applicationService: ApplicationService, private modalService: NgbModal, private uiService: UiService) { }

  /**
   * Lifecycle Events
   */

  ngOnInit() { this.refreshData()}

  ngOnDestroy() {        
    this.modalService.dismissAll('destroy')
  }

  /**
   * View Events
   */
  openApplicationCreateModal() { this.modal = this.uiService.showModal(ApplicationDetailModalComponent, this.refreshData); }
  openApplicationEditModal(application: Application) {
    this.modal = this.uiService.showModal(ApplicationEditModalComponent, this.refreshData);
    (<ApplicationEditModalComponent>this.modal.componentInstance)._applicationId = application.id;    
  }

  refreshData(params: string[] = this._requestParameters) { this.applications = this.applicationService.getApplications(params); }

  toggleApplicationState(value: any, obj: Application) {         
    let handler = () => { this.uiService.stopLoader(); this.refreshData(); };
    this.uiService.startLoader('Updating application state. Please wait...');    
    this.applicationService.updateState(obj.id, value).subscribe((res: Application) => handler() , () => handler());
  }  

  filterByKey(key: string, value: number){
    let index: number = this._requestParameters.findIndex((s) => s.startsWith(key + '='));
    (index > -1) ? (this._requestParameters[index] = `${key}=${value}`) : (this._requestParameters.push(`${key}=${value}`));    
    this.refreshData();
  }    
}
