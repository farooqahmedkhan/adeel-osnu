import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDetailModalComponent } from './application-detail-modal.component';

describe('ApplicationDetailModalComponent', () => {
  let component: ApplicationDetailModalComponent;
  let fixture: ComponentFixture<ApplicationDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
