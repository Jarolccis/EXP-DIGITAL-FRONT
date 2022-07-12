import { SearchProductComponent } from './modules/product-location/pages/search-product/search-product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  {
    path: '',//TODO (Private)
      component: SearchProductComponent,
    loadChildren: () => import(`./modules/product-location/product-location.module`).then(m => m.ProductLocationModule),

  },

  {
    path: 'product-location',//TODO (Private)
      component: SearchProductComponent,
    loadChildren: () => import(`./modules/product-location/product-location.module`).then(m => m.ProductLocationModule),

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
