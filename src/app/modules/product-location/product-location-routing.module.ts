import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchProductComponent } from './pages/search-product/search-product.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductLocationRoutingModule { }
