import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})

export class NewsService {
  constructor(private http: HttpClient,
    private config: ConfigService) { }

  private base = '/news';

  getNewsInformation(params: HttpParams = null) {
    const Headers = new HttpHeaders();
    return this.http.get(this.Url(), { headers: Headers, params: params, observe: 'response' });
  }

  deleteNew(idNew, params: HttpParams = null) {
    const Headers = new HttpHeaders();
    return this.http.delete(`${this.Url()}/${idNew}`, { headers: Headers, params: params, observe: 'response' });
  }

  Url(): string {
    return this.config.host.Make(this.base);
  }
}
