import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignInPageComponent} from './pages/sign-in-page/sign-in-page.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AuthenticatedGuard} from './core/guards/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInPageComponent
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
