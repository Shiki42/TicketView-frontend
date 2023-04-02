import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GapiKey, apiKey } from './apikey';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {}

  async fetchLocation() {
    try {
      const response = await this.http.get<any>('https://ipinfo.io/?token=508efef6f3e453').toPromise();
      const location = response.loc.split(',');
      return {
        latitude: location[0],
        longitude: location[1]
      };
    } catch (error) {
      console.error('Request failed:', error);
      return null;
    }
  }

  getLatLngFromAddress(address: string) {
    return this.http
      .get<any>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GapiKey}`)
      .toPromise()
      .then((data) => {
        if (data.status === 'OK') {
          const location = data.results[0].geometry.location;
          return {
            latitude: location.lat,
            longitude: location.lng
          };
        } else {
          console.error('Geocoding error:', data.status, data.error_message || '');
          return null;
        }
      })
      .catch((error) => {
        console.error('Failed to retrieve location from address:', error);
        throw new Error('Failed to retrieve location from address');
        return null;
      });
  }
}