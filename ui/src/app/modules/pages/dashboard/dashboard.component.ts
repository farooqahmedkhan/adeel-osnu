import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, Validators, FormGroup } from '@angular/forms';
import { Template } from '../../core/models/template.model';
import { Application } from '../../core/models/application.model';
import { Observable } from 'rxjs';
import { ApplicationService } from '../applications/application.service';
import { TemplateService } from '../templates/template.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SpinningComponent } from '../../shared/modals/spinning/spinning.component';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private template: Template = null;
  public ownerApplication: Application = null;
  public receiverApplications: Application[] = null;

  public ownerAppDataset: Observable<Application[]> = null;
  public receiverAppDataset: Observable<Application[]> = null;

  private _modalRef: NgbModalRef = null;

  public templateFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    os: new FormControl('1', Validators.required),
    message: new FormControl('', Validators.required),
    additional_fields: new FormArray([
      new FormGroup({
        key: new FormControl(''),
        value: new FormControl('')
      })      
    ]),
    launch_url: new FormControl('', Validators.required),
    owner_app: new FormControl('', Validators.required),
    receiver_apps: new FormArray([])
  });

  constructor(
    private applicationService: ApplicationService, 
    private templateService: TemplateService, 
    private modalService: NgbModal,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.receiverAppDataset = this.ownerAppDataset = this.applicationService.getApplications();    
    this.receiverAppDataset.subscribe((value: Application[]) => {            
      let controlFormArray = this.templateFormGroup.get('receiver_apps') as FormArray;      
      this.receiverApplications = value;
      value.forEach((i: Application) => {                
        controlFormArray.push(new FormControl(false));
      });      
      (controlFormArray.controls[0] as FormControl).setValue(true);      
    });

  }

  addNewAdditionalFieldRow(){
    let array = this.templateFormGroup.get('additional_fields') as FormArray;
    array.push(new FormGroup({
      key: new FormControl(),
      value: new FormControl()
    }));
  }

  get additionalValues(){ return <FormArray>this.templateFormGroup.get('additional_fields');}

  get receiverCheckboxControls(){ return <FormArray>this.templateFormGroup.get('receiver_apps');}

  submit(){        
    let data:any = this.templateFormGroup.value;            
    this.showSpinner();
    // this.receiverApps.forEach((item, index, source) => {      
    // });            
    let postObject = {
      sender: data.owner_app,
      receiver: this.receiverApps,
      name: data.name,
      message: data.message,
      os: data.os,
      launch_url: data.launch_url,
      additional_fields: data.additional_fields
    }
    this.notificationService.sendNotification(postObject).subscribe((res: any) => {
      this.hideSpinner();
    })
  }

  updateReceiverListOnRadioChange(index: number, app: Application){    
    (this.templateFormGroup.get('receiver_apps') as FormArray).controls.forEach((v: FormControl, i: number, arr: FormControl[]) => {
      if(index == i){
        v.setValue(false);        
        v.disable(); 
      }else{
        v.enable();
      }
    });
  }

  private get receiverApps() {
    return (this.templateFormGroup.get('receiver_apps') as FormArray).controls.map((control, index, source) => {
      return {
        disabled: control.disabled,
        value: this.receiverApplications[index],
        checked: control.value
      }
    }).filter((iterator, index, source) => {
      return (!iterator.disabled && iterator.checked);
    }).map((r) => r.value.id);
  }

  showSpinner(){    
  }

  hideSpinner(){
    this._modalRef.dismiss('');
  }

  updateSpinner(msg: string){
    (this._modalRef.componentInstance as SpinningComponent).message = msg;
  }
}
