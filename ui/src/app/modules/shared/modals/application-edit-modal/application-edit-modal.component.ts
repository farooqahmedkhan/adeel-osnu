import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Application } from '../../../core/models/application.model';
import { ApplicationService } from '../../../pages/applications/application.service';
import { UiService } from '../../../core/services/ui.service';
import { ApplicationDetailFormGroupMockup } from '../../../core/mockups/formgroup.mockups';

@Component({
  selector: 'app-application-edit-modal',
  templateUrl: './application-edit-modal.component.html',
  styleUrls: ['./application-edit-modal.component.css']
})
export class ApplicationEditModalComponent implements OnInit {
  @Input('id') _applicationId: Number;
  _application: Application;

  applicationFormGroup = ApplicationDetailFormGroupMockup;
  
  constructor(public activeModal: NgbModal, private applicationService: ApplicationService, private uiService: UiService) { }

  ngOnInit() {    
    this.applicationFormGroup.reset();
    this.uiService.startLoader('Loading application details. Please wait...');    
    this.applicationService.getApplication(this._applicationId)
      .subscribe((_res: Application) => { 
        this._application = _res;
        this.applicationFormGroup.setValue({
          name: this._application.name,
          os: this._application.os,
          one_signal_key: this._application.one_signal_key,
          one_signal_rest_api_key: this._application.one_signal_rest_api_key          
        });
        this.uiService.stopLoader();
      });
  }

  submit(){
    this.uiService.startLoader('Updating application. Please wait...');    
    this.applicationService.updateApplication(this._applicationId, this.applicationFormGroup.value)
    .subscribe(() => { 
      this.uiService.stopLoader();
      this.activeModal.dismissAll('update');
    });
  }
  

}
