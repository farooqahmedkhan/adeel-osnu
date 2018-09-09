import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../../../pages/applications/application.service';
import { Application } from '../../../core/models/application.model';
import { UiService } from '../../../core/services/ui.service';

@Component({
  selector: 'app-application-detail-modal',
  templateUrl: './application-detail-modal.component.html',
  styleUrls: ['./application-detail-modal.component.css']
})
export class ApplicationDetailModalComponent implements OnInit, OnDestroy {      
  applicationFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    os: new FormControl('1', Validators.required),
    one_signal_key: new FormControl('', Validators.required),
    one_signal_rest_api_key: new FormControl('', Validators.required)    
  });
  
  constructor(public activeModal: NgbModal, private applicationService: ApplicationService, private uiService: UiService) { }
  
  /**
   * Lifecycle Events
   */
  ngOnInit() {     
  }
  
  ngOnDestroy(): void { }    
  
  /**
   * UI Events
   */
  submit(){
    this.uiService.startLoader();
    this.uiService.updateLoader('Saving application. Please wait...');
    this.applicationService
      .saveApplication(<Application> this.applicationFormGroup.value)
      .subscribe((application: Application) => {
        this.uiService.stopLoader();
        this.activeModal.dismissAll('save');
      });    
  }  
  
}
