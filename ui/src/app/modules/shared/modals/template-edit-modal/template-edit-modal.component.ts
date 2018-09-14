import { Component, OnInit } from '@angular/core';
import { Template } from '../../../core/models/template.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateService } from '../../../pages/templates/template.service';
import { TemplateEditFormGroupMockup } from '../../../core/mockups/formgroup.mockups';
import { UiService } from '../../../core/services/ui.service';

@Component({
  selector: 'app-template-edit-modal',
  templateUrl: './template-edit-modal.component.html',
  styleUrls: ['./template-edit-modal.component.css']
})
export class TemplateEditModalComponent implements OnInit {
  _templateId: Number;
  private template: Template = null;
  public templateFormGroup = TemplateEditFormGroupMockup;

  constructor(public activeModal: NgbModal, private templateService: TemplateService, private uiService: UiService) { 

  }

  ngOnInit() {        
    this.uiService.startLoader();
    this.uiService.updateLoader('Loading template details. Please wait...');
    this.templateService.getTemplate(this._templateId)
    .subscribe((res: any) => {
      this.template = <Template> JSON.parse(res.json);            
      this.template.additional_fields.forEach((i) => this.addNewAdditionalFieldRow());      

      this.templateFormGroup.setValue({
        os: res.os,
        name: this.template.name,
        message: this.template.message,        
        additional_fields: this.template.additional_fields,
        big_picture: this.template.big_picture || ""
      });      
      this.uiService.stopLoader();
    });    
  }

  addNewAdditionalFieldRow(){
    let array = this.templateFormGroup.get('additional_fields') as FormArray;
    array.push(new FormGroup({
      key: new FormControl(''),
      value: new FormControl('')
    }));
  }

  removeAdditionalField(index: number){
    let array = this.templateFormGroup.get('additional_fields') as FormArray;
    array.removeAt(index);
  }

  submit(){    
    this.uiService.startLoader();
    this.uiService.updateLoader('Updating template. Please wait...');
    let handle = this.templateService.updateTemplate(this._templateId, <Template>this.templateFormGroup.value);
    handle.subscribe((res: Template) => {      
      this.uiService.stopLoader();
      this.activeModal.dismissAll('save');
    });
  }

  get additionalValues(){
    return <FormArray>this.templateFormGroup.get('additional_fields');
  }

}
