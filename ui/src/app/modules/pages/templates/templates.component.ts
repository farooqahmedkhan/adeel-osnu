import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Template } from '../../core/models/template.model';
import { TemplateEditModalComponent } from '../../shared/modals/template-edit-modal/template-edit-modal.component';
import { Observable } from 'rxjs';
import { TemplateService } from './template.service';
import { TemplateDetailModalComponent } from '../../shared/modals/template-detail-modal/template-detail-modal.component';
import { UiService } from '../../core/services/ui.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  modal: NgbModalRef;
  templates: Observable<Template[]>;
  private _requestParameters: string[] = [];

  constructor(private modalService: NgbModal, private templateService: TemplateService, private uiService: UiService) { }

  ngOnInit() { this.refreshData() }

  openTemplateCreateModal(){ 
    this.modal = this.uiService.showModal(TemplateDetailModalComponent, this.refreshData);
    this.modal.result.then(() => {}, () => this.refreshData());
  }
  openTemplateEditModal(template: Template){
    this.modal = this.uiService.showModal(TemplateEditModalComponent, this.refreshData);    
    (<TemplateEditModalComponent>this.modal.componentInstance)._templateId = template.id;    
    this.modal.result.then(() => {}, () => this.refreshData());
  }

  refreshData(params: string[] = this._requestParameters){ this.templates = this.templateService.getTemplates(params);}

  filterByKey(key: string, value: number){
    let index: number = this._requestParameters.findIndex((s) => s.startsWith(key + '='));
    (index > -1) ? (this._requestParameters[index] = `${key}=${value}`) : (this._requestParameters.push(`${key}=${value}`));    
    this.refreshData();
  }
}
