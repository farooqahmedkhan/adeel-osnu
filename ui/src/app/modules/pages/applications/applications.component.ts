import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../../core/models/application.model';
import { ApplicationService } from './application.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationDetailModalComponent } from '../../shared/modals/application-detail-modal/application-detail-modal.component';
import { ApplicationEditModalComponent } from '../../shared/modals/application-edit-modal/application-edit-modal.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  private modal: NgbModalRef;
  applications: Observable<Application[]>;

  constructor(private applicationService: ApplicationService, private modalService: NgbModal) { }

  /**
   * Lifecycle Events
   */

  ngOnInit() {    
    this.refreshData()
  }

  ngOnDestroy() {
    console.debug('----- Applications component destroyed -----');
    this.modalService.dismissAll('Application component destroyed');    
  }

  /**
   * View Events
   */
  openApplicationCreateModal(){
    this.modalService.open(ApplicationDetailModalComponent, { centered: true, backdrop: 'static', size: 'lg', keyboard: false})
    .result.then((value: String) => { }, (value: String) => { 
      switch(value){
        case "save":
        case "update":
          this.refreshData();
          break;
        default:
          break;
      }
    });
  }

  openApplicationEditModal(application: Application) {
    this.modal = this.modalService.open(ApplicationEditModalComponent, { 
      centered: true, 
      backdrop: 'static', 
      size: 'lg', 
      keyboard: false,      
    });
    (<ApplicationEditModalComponent>this.modal.componentInstance)._applicationId = application.id;
    this.modal.result.then((value: String) => {}, (value: String) => {
      switch(value){
        case "save":
        case "update":
          this.refreshData();
          break;
        default:
          break;
      }
    })
  }

  refreshData() { this.applications = this.applicationService.getApplications(); }
}
