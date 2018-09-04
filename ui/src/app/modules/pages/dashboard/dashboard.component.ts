import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DashboardFormGroupMockup } from 'src/app/modules/core/mockups/dashboard.ui.formgroup.mockup';
import { Template } from 'src/app/modules/core/models/template.model';
import { Application } from 'src/app/modules/core/models/application.model';
import { TemplateService } from 'src/app/modules/pages/templates/template.service';
import { ApplicationService } from 'src/app/modules/pages/applications/application.service';
import { NotificationService } from 'src/app/modules/core/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private template: Template = null;
  public ownerApplication: Application = null;
  public receiverApplications: Application[] = null;

  public ownerAppDataset: Observable<Application[]>;
  public receiverAppDataset: Observable<Application[]>;
  public existingTemplates: Observable<Template[]>;

  private _modalRef: NgbModalRef;
  public templateFormGroup = DashboardFormGroupMockup;

  constructor(
    private applicationService: ApplicationService, 
    private templateService: TemplateService, 
    private modalService: NgbModal,
    private notificationService: NotificationService
  ) { }

  ngOnInit() { this.refreshData();}

  loadTemplate(){
    this.templateService.getTemplate(this.templateFormGroup.get('selectedTemplate').value)
    .subscribe((res: any) => {
      this.template = <Template> JSON.parse(res.json);           

      this.template.additional_fields.forEach((i) => this.addNewAdditionalFieldRow());

      this.templateFormGroup.patchValue({
        os: res.os,
        name: this.template.name,
        message: this.template.message,
        launch_url: this.template.launch_url,
        additional_fields: this.template.additional_fields
      });      
    });
  }

  addNewAdditionalFieldRow(){ this.additionalValues.push(new FormGroup({ key: new FormControl(), value: new FormControl() }));}
  removeAdditionalField(index: number){ this.additionalValues.removeAt(index);}

  get additionalValues(){ return <FormArray>this.templateFormGroup.get('additional_fields');}
  get receiverCheckboxControls(){ return <FormArray>this.templateFormGroup.get('receiver_apps');}

  submit(){        
    let data:any = this.templateFormGroup.value;                    
    let postObject = {
      sender: data.owner_app,
      receiver: this.receiverApps,
      name: data.name,
      message: data.message,
      os: data.os,
      launch_url: data.launch_url,
      additional_fields: data.additional_fields
    }
    this.notificationService.sendNotification(postObject).subscribe((res: any) => alert('Notification(s) has been sent.'));
  }

  updateReceiverListOnRadioChange(index: number, app: Application){    
    this.receiverCheckboxControls.controls.forEach((v: FormControl, i: number, arr: FormControl[]) => {
      if(index == i){
        v.setValue(false);        
        v.disable(); 
      }else{
        v.enable();
      }      
    });
  }

  private get receiverApps() {
    return this.receiverCheckboxControls.controls.map((control, index) => {
      return {
        disabled: control.disabled,
        value: this.receiverApplications[index],
        checked: control.value
      }
    }).filter((iterator, index, source) => (!iterator.disabled && iterator.checked)).map((r) => r.value.id);
  }

  refreshData(){
    this.receiverAppDataset = this.ownerAppDataset = this.applicationService.getApplications();    
    this.receiverAppDataset.subscribe((value: Application[]) => {            
      this.receiverApplications = value;
      value.forEach((i: Application) => this.receiverCheckboxControls.push(new FormControl(false)));
      if(this.receiverCheckboxControls.controls.length > 0){ 
        (this.receiverCheckboxControls.controls[0] as FormControl).setValue(true);
      }      
    });    
    this.existingTemplates = this.templateService.getTemplates();
  }
}
