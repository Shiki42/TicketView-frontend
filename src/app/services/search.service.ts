import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverUrl } from './apikey';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

  searchEvents(keyword: string, distance: number, category: string, geoPoint: string) {
    const url = `${serverUrl}/events?keyword=${keyword}&distance=${distance}&category=${category}&geoPoint=${geoPoint}`;
    return this.http.get<any>(url).toPromise();
  }
}