import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverUrl } from './apikey';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  constructor(private http: HttpClient) {}

  fetchArtistDetails(artistName: string) {
    const url = `${serverUrl}/artist?keyword=${artistName}`;
    return this.http.get<any>(url).toPromise();
  }
}
