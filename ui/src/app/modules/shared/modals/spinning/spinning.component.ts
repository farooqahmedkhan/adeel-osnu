import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-spinning',
  templateUrl: './spinning.component.html',
  styleUrls: ['./spinning.component.css']
})
export class SpinningComponent implements OnInit {

  @Input('msg') message: string = 'Please wait ...';

  constructor(public activeModal: NgbModal) { }

  ngOnInit() {
  }

}
