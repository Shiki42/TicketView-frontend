import { Component, Input, OnInit } from '@angular/core';
import { GapiKey} from '../../../services/apikey';
@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.css']
})
export class VenueDetailComponent implements OnInit {
  @Input() venueData: any | null = null;
  showGoogleMap = false;
  constructor() {}

  ngOnInit(): void {
    this.loadGoogleMapsScript();
  }

  loadGoogleMapsScript(): void {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GapiKey}`;
    script.defer = true;
    script.async = true;
    document.body.appendChild(script);
  }
  openGoogleMapModal() {
    this.showGoogleMap = true;
  }
}
