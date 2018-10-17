import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DashboardFormGroupMockup, IOSMandatoryFormGroups, AndroidMandatoryFormGroups } from '../../core/mockups/formgroup.mockups';
import { Template } from 'src/app/modules/core/models/template.model';
import { Application } from 'src/app/modules/core/models/application.model';
import { TemplateService } from 'src/app/modules/pages/templates/template.service';
import { ApplicationService } from 'src/app/modules/pages/applications/application.service';
import { NotificationService } from 'src/app/modules/core/services/notification.service';
import { CustomFormGroup } from '../../core/custom_controls/CustomFormGroup.control';
import { UiService } from '../../core/services/ui.service';

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
  public saveAsTemplate: boolean = false;
  private requestParameters: string[] = ["enabled=1"];

  constructor(
    private applicationService: ApplicationService, 
    private templateService: TemplateService, 
    private modalService: NgbModal,
    private notificationService: NotificationService,
    private uiService: UiService
  ) { }

  ngOnInit() { 
    this.templateFormGroup.patchValue({os: 1});    
    this.refreshData(['enabled=1', 'os=1']);
  }

  loadTemplate(){            
    this.uiService.startLoader('Loading template. Please wait...');
    this.templateService.getTemplate(this.selectedTemplate.value)
    .subscribe((res: any) => {
      this.template = <Template> JSON.parse(res.json);                 
      
      // this.templateFormGroup.setValue({ additional_fields: []});
      
      this.templateFormGroup.removeControl('additional_fields');
      this.templateFormGroup.addControl('additional_fields', new FormArray([]));
      
      this.template.additional_fields.forEach((i) => this.addNewAdditionalFieldRow());

      this.templateFormGroup.patchValue({
        os: res.os,
        name: this.template.name || "",
        message: this.template.message || "",        
        additional_fields: this.template.additional_fields || [],
        big_picture: this.template.big_picture || ""
      });      
      
      // // refresh app data as well on sidebar      
      // this.requestParameters.push("os=" + res.os);
      // this.refreshData(this.requestParameters);
      this.refreshData(['enabled=1', 'os=' + res.os]);

      this.uiService.stopLoader();
    });
  }

  addNewAdditionalFieldRow(){ this.additionalValues.push(new CustomFormGroup({ key: new FormControl(), value: new FormControl() }));}
  removeAdditionalField(index: number){ this.additionalValues.removeAt(index);}

  get additionalValues(){ return <FormArray>this.templateFormGroup.get('additional_fields');}
  get receiverCheckboxControls(){ return <FormArray>this.templateFormGroup.get('receiver_apps');}
  get selectedTemplate(){ return this.templateFormGroup.get('selectedTemplate');}

  submit(){       
    this.uiService.startLoader();    

    let data:any = this.templateFormGroup.value;                    
    let pObj = { 
      sender: data.owner_app, 
      receiver: this.receiverApps, 
      name: data.name, 
      message: data.message, 
      os: data.os, 
      additional_fields: {}, 
      big_picture: data.big_picture,    
      delievery: data.notification_delivery
    };
    Array.from(data.additional_fields).map((v: any, i, s) => pObj.additional_fields[v.key] = v.value);
    
    if(this.saveAsTemplate){
      this.uiService.updateLoader('Saving template. Please wait...');
      this.templateService.saveTemplate(<Template>{ 
        name: data.name, 
        message: data.message, 
        os: data.os, 
        additional_fields: data.additional_fields, 
        big_picture: data.big_picture
      })
      .subscribe((res: Template) => {
        this.uiService.updateLoader('Sending notifications. Please wait...')
        this.notificationService.sendNotification(pObj).subscribe((res: any) => {
          this.uiService.updateLoader('Notification sent successfully.');
          this.uiService.stopLoader();
          alert('Notification(s) has been sent.');
        });
      })
    } else {
      this.uiService.updateLoader('Sending notifications. Please wait...')
      this.notificationService.sendNotification(pObj).subscribe((res: any) => {
        this.uiService.updateLoader('Notification sent successfully.');
        this.uiService.stopLoader();
        alert('Notification(s) has been sent.');
      });
    }
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

  checkAllReceiverApps(value: boolean){    
    this.receiverCheckboxControls.controls.forEach((v: FormControl) => {
      if(v.enabled){
        v.setValue(value);
      }
    });
  }

  refreshData(params: string[] = []){
    this.receiverAppDataset = this.ownerAppDataset = this.applicationService.getApplications(params);    
    this.receiverAppDataset.subscribe((value: Application[]) => {            
      this.receiverApplications = value;
      value.forEach((i: Application) => this.receiverCheckboxControls.push(new FormControl(false)));
      if(this.receiverCheckboxControls.controls.length > 0){ 
        (this.receiverCheckboxControls.controls[0] as FormControl).setValue(true);
      }      
    });    
    this.existingTemplates = this.templateService.getTemplates();
  }

  private get receiverApps() {
    return this.receiverCheckboxControls.controls.map((control, index) => {
      return {
        disabled: control.disabled,
        value: this.receiverApplications[index],
        checked: control.value
      }
    }).filter((iterator, index, source) => (!iterator.disabled && iterator.checked && iterator.value !== undefined)).map((r) => r.value.id);
  }

  adjustAdditionalData(event: any){          
    // remove all mandatory fields first
    this.additionalValues.controls.forEach((value: AbstractControl, i: number, obj: AbstractControl[]) => {      
      if((value as CustomFormGroup).isMandatoryControl){        
        (obj as CustomFormGroup[]).splice(i);
      }
    });    

    // update control list
    let controlSource: CustomFormGroup[] = (event.target.value  == 1) ? AndroidMandatoryFormGroups : IOSMandatoryFormGroups;
    controlSource.forEach((it: CustomFormGroup) => {
      let key_name: string = (it.get('key') as FormControl).value;      
      let index: number = this.additionalValues.controls.findIndex((value: AbstractControl, i: number, obj: AbstractControl[]) => {
        return (((value as CustomFormGroup).get('key') as FormControl).value == key_name);            
      });
      if(index == -1){
        this.additionalValues.controls.unshift(it);
      }      
    });      
    
    let os = this.templateFormGroup.get('os').value;
    this.refreshData(['enabled=1', 'os=' + os]);
  }

}
