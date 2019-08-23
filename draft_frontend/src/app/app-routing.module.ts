import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent, LoginComponent, CryptoComponent } from './_components';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  // incluir canActivate: [AuthGuard] en las rutas a validar
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'crypto', component: CryptoComponent, canActivate: [AuthGuard] },

  // Otherwise redirect to home
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
