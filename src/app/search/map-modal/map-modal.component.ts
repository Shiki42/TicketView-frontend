import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MapService } from '../detail-card/venue-detail/mapService';
@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss']
})
export class MapModalComponent {
  @ViewChild('mapModal', { static: false }) mapModal!: ModalDirective;
  venueData: any | null = null;

  // Your existing logic related to Google Maps
  // ...

  constructor(private mapService: MapService) {}

  get isMapJSloaded(): boolean {
    return this.mapService.MapJSloaded;
  }
  
  showModal(venueData: any) {
    this.venueData = venueData;
    (this.mapModal as any).show();
  }

  hideModal() {
    (this.mapModal as any).hide();
  }

  toNumber(value: string): number {
    return parseFloat(value);
  }
}