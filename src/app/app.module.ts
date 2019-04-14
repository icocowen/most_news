import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { SearchNewsComponent } from './search-news/search-news.component';
import { NavComponent } from './nav/nav.component';
import { ContentModule } from './content/content.module';
import { LoginWrapComponent } from './login-wrap/login-wrap.component';
import { RegisterComponent } from './register/register.component';
import { CookieService } from 'ngx-cookie-service';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    SearchNewsComponent,
    NavComponent,
    LoginWrapComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ContentModule,
    AppRoutingModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

