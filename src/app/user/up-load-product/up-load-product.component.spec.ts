import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpLoadProductComponent } from './up-load-product.component';

describe('UpLoadProductComponent', () => {
  let component: UpLoadProductComponent;
  let fixture: ComponentFixture<UpLoadProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpLoadProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpLoadProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
