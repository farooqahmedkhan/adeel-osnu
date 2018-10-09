import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../../../pages/applications/application.service';
import { Application } from '../../../core/models/application.model';
import { UiService } from '../../../core/services/ui.service';
import { ApplicationDetailFormGroupMockup } from 'src/app/modules/core/mockups/formgroup.mockups';

@Component({
  selector: 'app-application-detail-modal',
  templateUrl: './application-detail-modal.component.html',
  styleUrls: ['./application-detail-modal.component.css']
})
export class ApplicationDetailModalComponent implements OnInit, OnDestroy {      
  applicationFormGroup = ApplicationDetailFormGroupMockup;
  
  constructor(public activeModal: NgbModal, private applicationService: ApplicationService, private uiService: UiService) { }
  
  /**
   * Lifecycle Events
   */
  ngOnInit() {     
    this.applicationFormGroup.reset();
  }
  
  ngOnDestroy(): void { this.activeModal.dismissAll('close')}    
  
  /**
   * UI Events
   */
  submit(){
    this.uiService.startLoader('Saving application. Please wait...');    
    this.applicationService
      .saveApplication(<Application> this.applicationFormGroup.value)
      .subscribe((application: Application) => {
        this.uiService.stopLoader();
        this.activeModal.dismissAll('save');
      });    
  }  
  
}
