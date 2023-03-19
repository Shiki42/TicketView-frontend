import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverUrl } from './apikey';
@Injectable({
  providedIn: 'root'
})
export class EventDetailService {
  constructor(private http: HttpClient) {}

  fetchEventDetails(eventId: string) {
    const url = `${serverUrl}/events/details${eventId}`;
    return this.http.get<any>(url).toPromise();
  }
}