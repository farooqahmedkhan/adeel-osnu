import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateService } from '../../../pages/templates/template.service';
import { Template } from '../../../core/models/template.model';
import { CustomFormGroup } from '../../../core/custom_controls/CustomFormGroup.control';
import { AndroidMandatoryFormGroups, IOSMandatoryFormGroups, TemplateDetailFormGroupMockup } from '../../../core/mockups/formgroup.mockups';
import { UiService } from '../../../core/services/ui.service';

@Component({
  selector: 'app-template-detail-modal',
  templateUrl: './template-detail-modal.component.html',
  styleUrls: ['./template-detail-modal.component.css']
})
export class TemplateDetailModalComponent implements OnInit {
  private template: Template = null;
  public templateFormGroup = TemplateDetailFormGroupMockup;

  constructor(public activeModal: NgbModal, private tempalteService: TemplateService, private uiService: UiService) { 

  }

  ngOnInit() {    
  }

  addNewAdditionalFieldRow(){
    let array = this.templateFormGroup.get('additional_fields') as FormArray;
    array.push(new CustomFormGroup({
      key: new FormControl(),
      value: new FormControl()
    }));
  }

  removeAdditionalField(index: number){
    let array = this.templateFormGroup.get('additional_fields') as FormArray;
    array.removeAt(index);
  }

  submit(){    
    this.uiService.startLoader();
    this.uiService.updateLoader('Saving template. Please wait...');
    let handle = this.tempalteService.saveTemplate(<Template>this.templateFormGroup.value);
    handle.subscribe((res: Template) => {      
      this.uiService.stopLoader();
      this.activeModal.dismissAll('save');
    });
  }

  get additionalValues(){
    return <FormArray>this.templateFormGroup.get('additional_fields');
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
  }

}
