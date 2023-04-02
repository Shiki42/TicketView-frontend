import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverUrl } from './apikey';

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  constructor(private http: HttpClient) {}

  fetchVenueDetails(venueId: string) {
    const url = `${serverUrl}/venues?id=${venueId}`;
    return this.http.get<any>(url).toPromise();
  }
}
