import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsTagsComponent } from './news-tags.component';

describe('NewsTagsComponent', () => {
  let component: NewsTagsComponent;
  let fixture: ComponentFixture<NewsTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
