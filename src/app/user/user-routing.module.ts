import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserProductComponent } from './user-product/user-product.component';
import { DymanicInfoComponent } from './dymanic-info/dymanic-info.component';
import { UpLoadProductComponent } from './up-load-product/up-load-product.component';
import { UserFavoritComponent } from './user-favorit/user-favorit.component';
import { UserSubscriptionComponent } from './user-subscription/user-subscription.component';


const route: Routes = [
  {
    path: 'user/:id', component: UserHomeComponent,
    children:[
      {path: '', component: UserProductComponent},
      {path: 'dymanic', component: DymanicInfoComponent},
      {path: 'upLoad', component: UpLoadProductComponent},
      {path: 'favorit', component: UserFavoritComponent},
      {path: 'subscription', component: UserSubscriptionComponent},
  ] 
}
];

@NgModule({
  imports: [
    RouterModule.forChild(route),
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule {
}
