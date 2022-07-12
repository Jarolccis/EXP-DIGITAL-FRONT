import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './components/search/search.component';
import { SearchProductComponent } from './pages/search-product/search-product.component';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";





@NgModule({
  declarations: [
    SearchComponent,
    SearchProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    
  ]
})
export class ProductLocationModule { }
