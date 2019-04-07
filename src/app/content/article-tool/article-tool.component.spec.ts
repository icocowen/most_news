import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleToolComponent } from './article-tool.component';

describe('ArticleToolComponent', () => {
  let component: ArticleToolComponent;
  let fixture: ComponentFixture<ArticleToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
