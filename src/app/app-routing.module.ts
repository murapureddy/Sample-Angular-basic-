import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import {AuthService} from './auth.service'


const routes: Routes = [
  {path: 'login',component: SignInComponent},
  {path: 'product-list',component: ProductListComponent,canActivate: [AuthService]},
  {path: 'product-form',component: ProductNewComponent,canActivate: [AuthService]},
  {path: 'product-detail/:id',component: ProductDetailComponent,canActivate: [AuthService]},
  {path: 'edit/:id',component: ProductNewComponent,canActivate: [AuthService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
