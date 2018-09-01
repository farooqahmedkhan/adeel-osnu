import { Component, OnInit } from '@angular/core';
import { Template } from '../../../core/models/template.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateService } from '../../../pages/templates/template.service';

@Component({
  selector: 'app-template-edit-modal',
  templateUrl: './template-edit-modal.component.html',
  styleUrls: ['./template-edit-modal.component.css']
})
export class TemplateEditModalComponent implements OnInit {
  _templateId: Number;
  private template: Template = null;
  public templateFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    os: new FormControl('1', Validators.required),
    message: new FormControl('', Validators.required),
    additional_fields: new FormArray([
      // new FormGroup({
      //   key: new FormControl(''),
      //   value: new FormControl('')
      // })      
    ]),
    launch_url: new FormControl('', Validators.required)
  });

  constructor(public activeModal: NgbModal, private templateService: TemplateService) { 

  }

  ngOnInit() {
    this.templateService.getTemplate(this._templateId)
    .subscribe((res: any) => {
      this.template = <Template> JSON.parse(res.json);            
      
      this.template.additional_fields.forEach((i) => this.addNewAdditionalFieldRow());

      this.templateFormGroup.setValue({
        os: res.os,
        name: this.template.name,
        message: this.template.message,
        launch_url: this.template.launch_url,
        additional_fields: this.template.additional_fields
      });      
    });    
  }

  addNewAdditionalFieldRow(){
    let array = this.templateFormGroup.get('additional_fields') as FormArray;
    array.push(new FormGroup({
      key: new FormControl(),
      value: new FormControl()
    }));
  }

  removeAdditionalField(index: number){
    let array = this.templateFormGroup.get('additional_fields') as FormArray;
    array.removeAt(index);
  }

  submit(){    
    let handle = this.templateService.updateTemplate(this._templateId, <Template>this.templateFormGroup.value);
    handle.subscribe((res: Template) => {      
      this.activeModal.dismissAll('save');
    });
  }

  get additionalValues(){
    return <FormArray>this.templateFormGroup.get('additional_fields');
  }

}
