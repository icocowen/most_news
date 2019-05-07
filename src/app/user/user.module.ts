import { NgModule } from '@angular/core';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserRoutingModule } from './user-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProductComponent } from './user-product/user-product.component';
import { DymanicInfoComponent } from './dymanic-info/dymanic-info.component';
import { UpLoadProductComponent } from './up-load-product/up-load-product.component';
import { UserFavoritComponent } from './user-favorit/user-favorit.component';
import { UserSubscriptionComponent } from './user-subscription/user-subscription.component';


@NgModule({
  declarations: [
    UserHomeComponent,
    UserProductComponent,
    DymanicInfoComponent,
    UpLoadProductComponent,
    UserFavoritComponent,
    UserSubscriptionComponent
        ],
  imports: [  
    NgZorroAntdModule,
    UserRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
