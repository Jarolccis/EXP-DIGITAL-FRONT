import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly URL_JARVIS = environment.api_jarvis;
  private readonly URL_SPREADSHEET = environment.api_spreadsheet;

  constructor(private http: HttpClient) {}

  searchProducts$(
    code_store: string,
    product_description: string
  ): Observable<any> {
    const body = {
      code_store: code_store,
      code_hierarchy: '',
      country: 'PE',
      product_description: product_description,
    };

    const headers = {
      'x-country': 'PE',
      'x-commerce': 'Tottus',
      'x-usrtx': 'tss',
    };

    return this.http.post(
      'https://lid-exp-dot-tot-bi-corp-chatbot-dev.uc.r.appspot.com/exp-digital-tda/checklocation',
      body,
      { headers }
    );
  }
}
