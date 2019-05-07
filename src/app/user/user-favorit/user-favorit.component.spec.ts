import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFavoritComponent } from './user-favorit.component';

describe('UserFavoritComponent', () => {
  let component: UserFavoritComponent;
  let fixture: ComponentFixture<UserFavoritComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFavoritComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFavoritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
