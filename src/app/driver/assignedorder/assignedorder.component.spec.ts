import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedorderComponent } from './assignedorder.component';

describe('AssignedorderComponent', () => {
  let component: AssignedorderComponent;
  let fixture: ComponentFixture<AssignedorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
