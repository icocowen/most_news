import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { NewsComponent } from './news/news.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { LoginComponent } from './login/login.component';
import { LoginWrapComponent } from '../login-wrap/login-wrap.component';

const routes: Routes = [
  {
    path: '', component: MainContentComponent,
    children: [
      {path: '', redirectTo: 'recommed', pathMatch: 'full'},
      {path: 'recommed', component: NewsComponent, data:{title: 'recommed'}},
    ]
  },
  {path: 'newsItem/:id', component: NewsItemComponent},
  {path: 'login', component: LoginWrapComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
