import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DymanicInfoComponent } from './dymanic-info.component';

describe('DymanicInfoComponent', () => {
  let component: DymanicInfoComponent;
  let fixture: ComponentFixture<DymanicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DymanicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DymanicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
