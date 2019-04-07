import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { NewsTypeComponent } from './news-type/news-type.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsComponent } from './news/news.component';
import { NewsCarouselComponent } from './news-carousel/news-carousel.component';
import { LoginComponent } from './login/login.component';
import { NewsTagsComponent } from './news-tags/news-tags.component';
import { NewsCopyrightComponent } from './news-copyright/news-copyright.component';
import { MainContentComponent } from './main-content/main-content.component';
import { NavComponent } from '../nav/nav.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArticleToolComponent } from './article-tool/article-tool.component';
import { NewsItemComponent } from './news-item/news-item.component';

@NgModule({
  declarations: [ 
    NewsTypeComponent,
    NewsListComponent,
    NewsComponent,
    NewsCarouselComponent,
    LoginComponent,
    NewsTagsComponent,
    NewsCopyrightComponent,
    MainContentComponent,
    NewsItemComponent,
    ArticleToolComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent
  ]
})
export class ContentModule { }
