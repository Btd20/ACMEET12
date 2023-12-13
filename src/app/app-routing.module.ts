import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CallbackComponent } from './components/callback/callback.component';
import { AutoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  // {
  //   path: 'forgotPassword',
  //   loadChildren: () => import('./components/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  // },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule)
  // },
  {
    path: 'home',
    loadChildren: () => import('./pages/adm.module').then(m => m.AdmModule), canActivate: [AutoLoginPartialRoutesGuard]
  },
  // Agregar una ruta para listUser
  {
    path: 'listUser',
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
    canActivate: [AutoLoginPartialRoutesGuard]
  },
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
