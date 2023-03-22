import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverUrl } from './apikey';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {
  constructor(private http: HttpClient) {}

  fetchAutoCompletes(keyword: string) {
    const url = `${serverUrl}/autoComplete?keyword=${keyword}`;
    return this.http.get<any>(url).toPromise();
  }
}