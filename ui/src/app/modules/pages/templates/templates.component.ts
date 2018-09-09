import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Template } from '../../core/models/template.model';
import { TemplateEditModalComponent } from '../../shared/modals/template-edit-modal/template-edit-modal.component';
import { Observable } from 'rxjs';
import { TemplateService } from './template.service';
import { TemplateDetailModalComponent } from '../../shared/modals/template-detail-modal/template-detail-modal.component';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  modal: NgbModalRef;
  private _requestParameters: string[] = [];
  templates: Observable<Template[]>;
  constructor(private modalService: NgbModal, private templateService: TemplateService) { }

  ngOnInit() {
    this.refreshData();
  }

  openTemplateCreateModal(){
    this.modalService.dismissAll('');
    this.modal = this.modalService.open(TemplateDetailModalComponent, { 
      backdrop: 'static', 
      keyboard: false, 
      centered: true, 
      size: 'lg'
    });    
    this.modal.result.then((value: String) => {}, (value: String) => {
      switch(value){
        case "save":
        case "update":
          this.refreshData();
          break;
        default:
          break;
      }
    });
  }

  openTemplateEditModal(template: Template){
    this.modalService.dismissAll('');
    this.modal = this.modalService.open(TemplateEditModalComponent, { 
      backdrop: 'static', 
      keyboard: false, 
      centered: true, 
      size: 'lg'
    });
    (<TemplateEditModalComponent>this.modal.componentInstance)._templateId = template.id;
    this.modal.result.then((value: String) => {}, (value: String) => {
      switch(value){
        case "save":
        case "update":
          this.refreshData();
          break;
        default:
          break;
      }
    });
  }

  refreshData(params: string[] = this._requestParameters){ this.templates = this.templateService.getTemplates(params);}

  filterByKey(key: string, value: number){
    let index: number = this._requestParameters.findIndex((s) => s.startsWith(key + '='));
    if(index > -1){
      this._requestParameters[index] = key + "=" + value;
    }else{
      this._requestParameters.push(key + "=" + value);
    }
    this.refreshData();
  } 

}
