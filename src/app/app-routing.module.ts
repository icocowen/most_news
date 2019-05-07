import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ReleaseToolComponent } from './release-tool/release-tool.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'release/:id', component: ReleaseToolComponent, data:{ target : "release"}},
  {path: 'publish', component: ReleaseToolComponent, data:{ target : "publish"}},
  {path: '**', redirectTo: 'recommed'}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 