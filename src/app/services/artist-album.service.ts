import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serverUrl } from './apikey';


@Injectable({
  providedIn: 'root'
})
export class ArtistAlbumService {
  constructor(private http: HttpClient) {}

  fetchArtistAlbum(artistId: string) {
    const url = `${serverUrl}/artist/album?id=${artistId}`;
    return this.http.get<any>(url).toPromise();
  }
}
