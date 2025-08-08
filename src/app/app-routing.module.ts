import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './features/main/main.component';
import { ProductsComponent } from './features/products/products/products.component';
import { OrderComponent } from './features/order/order.component';
import { ProductComponent } from './features/products/product/product.component';

const routes: Routes = [  {
  path: '', component: MainComponent
  },
   {
  path: 'products', component: ProductsComponent
  },
  {
  path: 'products/:id', component: ProductComponent
  },
  {
   path: 'order', component: OrderComponent
  },
  {
    path:'**', redirectTo: ''
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {  anchorScrolling: 'enabled', useHash: true,
  scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
