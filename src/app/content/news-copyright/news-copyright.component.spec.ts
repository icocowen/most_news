import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCopyrightComponent } from './news-copyright.component';

describe('NewsCopyrightComponent', () => {
  let component: NewsCopyrightComponent;
  let fixture: ComponentFixture<NewsCopyrightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsCopyrightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCopyrightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
