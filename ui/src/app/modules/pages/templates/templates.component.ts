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
  templates: Observable<Template[]>;
  constructor(private modalService: NgbModal, private templateService: TemplateService) { }

  ngOnInit() {
    this.refreshData();
  }

  openTemplateCreateModal(){
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

  refreshData(){
    this.templates = this.templateService.getTemplates();
  }

}
