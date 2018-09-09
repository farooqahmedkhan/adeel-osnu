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
  private _requestParameters: string[] = [];
  applications: Observable<Application[]>;

  constructor(private applicationService: ApplicationService, private modalService: NgbModal, private uiService: UiService) { }

  /**
   * Lifecycle Events
   */

  ngOnInit() { this.refreshData();}

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

  refreshData(params: string[] = this._requestParameters) { this.applications = this.applicationService.getApplications(params); }

  toggleApplicationState(value: any, obj: Application) {     
    this.uiService.startLoader();
    this.uiService.updateLoader('Updating application state. Please wait...');        
    this.applicationService.updateState(obj.id, value)    
    .subscribe((res: Application) => {
      this.uiService.stopLoader();      
      this.refreshData();
    }, () => {
      this.uiService.stopLoader();
      this.refreshData()
    });
  }  

  filterByKey(key: string, value: number){
    let index: number = this._requestParameters.findIndex((s) => s.startsWith(key + '='));
    if(index > -1){
      this._requestParameters[index] = key + "=" + value;
    }else{
      this._requestParameters.push(key + "=" + value);
    }
    this.refreshData();
  }  

  get isFilterByState(){ return (this._requestParameters.findIndex((s) => s.startsWith('enabled=') && (+(s.split("=")[1]) > -1)) > -1);}
  get isFilterByPlatform(){ return (this._requestParameters.findIndex((s) => s.startsWith('os=') && (+(s.split("=")[1]) > -1)) > -1);}
}
