import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationEditModalComponent } from './application-edit-modal.component';

describe('ApplicationEditModalComponent', () => {
  let component: ApplicationEditModalComponent;
  let fixture: ComponentFixture<ApplicationEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
