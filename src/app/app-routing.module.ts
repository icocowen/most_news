import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './content/login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: 'recommed'}
];
// {path: 'recommed', component: NewsComponent, data: {title: 'recommed'}},
// {path: 'hotnews', component: NewsComponent}

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 