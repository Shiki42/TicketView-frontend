import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverUrl } from './apikey';


@Injectable({
  providedIn: 'root'
})
export class ArtistAlbumService {
  constructor(private http: HttpClient) {}

  fetchArtistDetails(artistId: string) {
    const url = `${serverUrl}/artist/album?keyword=${artistId}`;
    return this.http.get<any>(url).toPromise();
  }
}
