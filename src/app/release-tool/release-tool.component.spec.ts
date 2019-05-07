import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseToolComponent } from './release-tool.component';

describe('ReleaseToolComponent', () => {
  let component: ReleaseToolComponent;
  let fixture: ComponentFixture<ReleaseToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
