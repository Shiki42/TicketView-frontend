import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverUrl } from './apikey';

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  constructor(private http: HttpClient) {}

  fetchVenueDetails(venueName: string) {
    const url = `${serverUrl}/venues?keyword=${venueName}`;
    return this.http.get<any>(url).toPromise();
  }
}
