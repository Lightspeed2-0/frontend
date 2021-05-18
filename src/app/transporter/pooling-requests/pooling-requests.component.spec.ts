import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolingRequestsComponent } from './pooling-requests.component';

describe('PoolingRequestsComponent', () => {
  let component: PoolingRequestsComponent;
  let fixture: ComponentFixture<PoolingRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolingRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
