import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService],
})
export class SearchComponent implements OnInit {
  listResults$: Observable<any> = of([]);
  orderObj: any;
  pasillo: any = '';
  categoria: any;
  tienda: any;
  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}
  search = new FormControl('');
  coordenadas = ['0', '0'];
  isLoading = false;
  altura = 0;
  pa_sec = '';

  showToatr() {
    this.toastr.success('Hola', 'title');
  }

  searchProduct() {
    try {
      console.log(this.tienda);
      this.tienda = this.tienda === undefined ? '124' : this.tienda;
      console.log(this.tienda);
      if (this.search.value !== '') {
        this.spinner.show();
        this.isLoading = true;
        let description = this.search?.value === null ? '' : this.search?.value;
        try {
        } catch (error) {}
        this.searchService.searchProducts$(this.tienda, description).subscribe(
          (res) => {
            try {
              console.log('RESPIETA');
              console.log('res', res);
              this.coordenadas = res[0].coordenadas.split(';');
              console.log(this.coordenadas);
              this.pasillo = res[0].pasillo;
              let categoriaMin = res[0].categoria.toLowerCase();
              let primeraLetra = categoriaMin[0].toUpperCase();
              let restoDelSaludo = categoriaMin.slice(1);
              this.categoria = primeraLetra + restoDelSaludo;
              let s = document.getElementById('Layer1');
              
              s?.scroll(
                parseInt(this.coordenadas[1]) - 200,
                parseInt(this.coordenadas[0]) - 200
              );

              if (res[0].activo) {
                this.pa_sec = 'Pasillo';
              } else {
                this.pa_sec = 'Sección';
              }
              this.search.setValue('');
              this.spinner.hide();
              this.isLoading = false;
            } catch (error) {
              this.spinner.hide();
              this.isLoading = false;
            }
          },
          (err) => {
            console.log('err', err);
            this.search.setValue('');
            let searchB = document.getElementById('searchB');
            searchB?.focus();
            //Capturamos el error
            this.toastr.error('Producto no encontrado', 'Lo sentimos');
            this.spinner.hide();
            this.isLoading = false;
          }
        );
      }
    } catch (error) {
      this.spinner.hide();
      this.isLoading = false;
    }
  }

  ngOnInit(): void {
    try {
      this.altura = screen.height - 420;
      this.route.queryParams.subscribe((params) => {
        // @ts-ignore
        if (params.categoria && params.pasillo) {
          this.spinner.show();
          // @ts-ignore
          this.pasillo = params.pasillo;
          // @ts-ignore
          this.categoria = params.categoria;
          // @ts-ignore
          this.tienda = params.tienda;

          this.searchService
            .searchProducts$(this.tienda, this.categoria)
            .subscribe((res) => {
              console.log('res', res);
              this.coordenadas = res[0].coordenadas.split(';');
              console.log(this.coordenadas);
              this.pasillo = res[0].pasillo;
              // @ts-ignore
              let categoriaMin = res[0].categoria.toLowerCase();
              let primeraLetra = categoriaMin[0].toUpperCase();
              let restoDelSaludo = categoriaMin.slice(1);
              this.categoria = primeraLetra + restoDelSaludo;
              this.spinner.hide();

              let s = document.getElementById('Layer1');
              s?.scroll(
                parseInt(this.coordenadas[1]) - 200,
                parseInt(this.coordenadas[0]) - 200
              );

              if (res[0].activo) {
                this.pa_sec = 'Pasillo';
              } else {
                this.pa_sec = 'Sección';
              }

            });



        }
      });
    } catch (error) {
      this.spinner.hide();
    }
  }
}
