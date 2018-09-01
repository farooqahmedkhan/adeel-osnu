import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateService } from '../../../pages/templates/template.service';
import { Template } from '../../../core/models/template.model';

@Component({
  selector: 'app-template-detail-modal',
  templateUrl: './template-detail-modal.component.html',
  styleUrls: ['./template-detail-modal.component.css']
})
export class TemplateDetailModalComponent implements OnInit {
  private template: Template = null;
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
    launch_url: new FormControl('', Validators.required)
  });

  constructor(public activeModal: NgbModal, private tempalteService: TemplateService) { 

  }

  ngOnInit() {    
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
    let handle = this.tempalteService.saveTemplate(<Template>this.templateFormGroup.value);
    handle.subscribe((res: Template) => {      
      this.activeModal.dismissAll('save');
    });
  }

  get additionalValues(){
    return <FormArray>this.templateFormGroup.get('additional_fields');
  }

}
