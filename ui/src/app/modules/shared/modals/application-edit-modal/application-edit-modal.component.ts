import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Application } from '../../../core/models/application.model';
import { ApplicationService } from '../../../pages/applications/application.service';

@Component({
  selector: 'app-application-edit-modal',
  templateUrl: './application-edit-modal.component.html',
  styleUrls: ['./application-edit-modal.component.css']
})
export class ApplicationEditModalComponent implements OnInit {
  @Input('id') _applicationId: Number;
  _application: Application;

  applicationFormGroup = new FormGroup({    
    name: new FormControl('', Validators.required),
    os: new FormControl('1', Validators.required),
    one_signal_key: new FormControl('', Validators.required),
    one_signal_rest_api_key: new FormControl('', Validators.required),
    one_signal_user_auth_key: new FormControl('')
  });
  
  constructor(public activeModal: NgbModal, private applicationService: ApplicationService) { }

  ngOnInit() {    
    this.applicationService.getApplication(this._applicationId)
      .subscribe((_res: Application) => { 
        this._application = _res;
        this.applicationFormGroup.setValue({
          name: this._application.name,
          os: this._application.os,
          one_signal_key: this._application.one_signal_key,
          one_signal_rest_api_key: this._application.one_signal_rest_api_key,
          one_signal_user_auth_key: this._application.one_signal_user_auth_key
        });
      });
  }

  submit(){
    this.applicationService.updateApplication(this._applicationId, this.applicationFormGroup.value)
    .subscribe(() => this.activeModal.dismissAll('update'));
  }
  

}
