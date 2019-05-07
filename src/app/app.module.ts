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
import { UserModule } from './user/user.module';
import { ReleaseToolComponent } from './release-tool/release-tool.component';
import { NewsServerService } from './data/news-server.service';
import { LoginService } from './utility/login.service';
import { SanitizingPipe } from './utility/sanitizing.pipe';


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    SearchNewsComponent,
    NavComponent,
    LoginWrapComponent,
    RegisterComponent,
    ReleaseToolComponent,
    SanitizingPipe
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ContentModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    CookieService , 
    {provide: 'DOMAIN_API', useValue: 'http://localhost:8080/phpService/index.php'},
    NewsServerService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

