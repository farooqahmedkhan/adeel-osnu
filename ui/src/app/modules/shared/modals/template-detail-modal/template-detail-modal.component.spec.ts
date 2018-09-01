import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDetailModalComponent } from './template-detail-modal.component';

describe('TemplateDetailModalComponent', () => {
  let component: TemplateDetailModalComponent;
  let fixture: ComponentFixture<TemplateDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
