import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolingComponent } from './pooling.component';

describe('PoolingComponent', () => {
  let component: PoolingComponent;
  let fixture: ComponentFixture<PoolingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
