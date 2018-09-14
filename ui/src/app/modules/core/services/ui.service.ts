import { Injectable } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinningComponent } from '../../shared/modals/spinning/spinning.component';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private uiModalRef: NgbModalRef = null;

  constructor(private modalService: NgbModal) { }

  startLoader(message: string = 'Please wait...'){     
    this.uiModalRef = this.modalService.open(SpinningComponent, { centered: true, backdrop: 'static', size: 'sm', keyboard: false})
    this.updateLoader(message);
  }

  updateLoader(msg: string){
    if(this.uiModalRef !== null)
      (<SpinningComponent>this.uiModalRef.componentInstance).message = msg;    
  }

  stopLoader(){ this.uiModalRef.dismiss('close');}

  showModal(content: any, callback: Function){
    this.uiModalRef = this.modalService.open(content, { centered: true, backdrop: 'static', size: 'lg', keyboard: false});
    this.uiModalRef.result.then((r: string) => {}, (r: string) => callback());
    return this.uiModalRef;
  }
}
