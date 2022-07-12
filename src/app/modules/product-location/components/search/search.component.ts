import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService],
})
export class SearchComponent implements OnInit {
  listResults$: Observable<any> = of([]);
  orderObj: any;
  pasillo: any;
  categoria: any;
  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}
  search = new FormControl('');
  coordenadas = ['0', '0'];
  isLoading = false;
  altura = 0;

  searchProduct() {
    if (this.search.value !== '') {
      this.spinner.show();
      this.isLoading = true;
      console.log('BUSCOA', this.search.value);
      let description = this.search?.value === null ? '' : this.search?.value;
      this.searchService
        .searchProducts$('124', description)
        .subscribe((res) => {
          console.log('res', res);
          this.coordenadas = res[0].coordenadas.split(';');
          console.log(this.coordenadas);
          this.pasillo = res[0].pasillo;

          let categoriaMin = res[0].categoria.toLowerCase();
          let primeraLetra = categoriaMin[0].toUpperCase();
          let restoDelSaludo = categoriaMin.slice(1);
          console.log('HOLAAA');

          this.categoria = primeraLetra + restoDelSaludo;
          let s = document.getElementById('Layer1');
          s?.scroll(
            parseInt(this.coordenadas[1]),
            parseInt(this.coordenadas[0])
          );
          this.spinner.hide();
          this.isLoading = false;
        });
    }
  }

  ngOnInit(): void {
    try {
      this.altura = screen.height - 280;
      console.log('altura', this.altura);

      this.route.queryParams.subscribe((params) => {
        // @ts-ignore
        if (params.categoria && params.pasillo) {
          this.spinner.show();
          // @ts-ignore
          this.pasillo = params.pasillo;
          // @ts-ignore
          this.categoria = params.categoria;

          this.searchService
            .searchProducts$('124', this.categoria)
            .subscribe((res) => {
              console.log('res', res);
              console.log('reswwwww', res);
              this.coordenadas = res[0].coordenadas.split(';');
              console.log(this.coordenadas);
              this.pasillo = res[0].pasillo;
              // @ts-ignore

              let categoriaMin = res[0].categoria.toLowerCase();
              let primeraLetra = categoriaMin[0].toUpperCase();
              let restoDelSaludo = categoriaMin.slice(1);
              console.log('HOLAAA');

              this.categoria = primeraLetra + restoDelSaludo;
              this.spinner.hide();
            });

          console.log('params', this.pasillo);

          let s = document.getElementById('Layer1');
          s?.scroll(
            parseInt(this.coordenadas[1]),
            parseInt(this.coordenadas[0])
          );
        }
      });
    } catch (error) {
      this.spinner.hide();
    }
  }
}