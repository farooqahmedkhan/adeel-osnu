import { Injectable } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinningComponent } from '../../shared/modals/spinning/spinning.component';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private uiModalRef: NgbModalRef = null;

  constructor(private modalService: NgbModal) { }

  startLoader(){ 
    this.uiModalRef = this.modalService.open(SpinningComponent, { centered: true, backdrop: 'static', size: 'sm', keyboard: false})
  }

  updateLoader(msg: string){
    if(this.uiModalRef !== null) {
      (<SpinningComponent>this.uiModalRef.componentInstance).message = msg;
    }
  }

  stopLoader(){ this.uiModalRef.dismiss('close');}
}
