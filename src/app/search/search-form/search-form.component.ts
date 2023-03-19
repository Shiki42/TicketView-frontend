import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { SearchService } from '../../services/search.service';
import Geohash from '../../services/geohash';
@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  @Output() clearResults = new EventEmitter<void>();
  @Output() searchResults = new EventEmitter<any>();

  isLocationHidden = false;

  searchForm = new FormGroup({
    keyword: new FormControl(''),
    distance: new FormControl(''),
    category: new FormControl('default'),
    autoDetect: new FormControl(false),
    location: new FormControl(''),
  });

  clear() {
    this.searchForm.setValue({
      keyword: '',
      distance: '',
      category: 'default',
      autoDetect: false,
      location: '',
    });
    // Emit the custom event to the parent component
    this.clearResults.emit();
  }
  
  constructor(private locationService: LocationService, private searchService: SearchService) {}

  async onSubmit() {
    if (this.searchForm.valid) {
      const { keyword, distance, category, autoDetect, location } = this.searchForm.value;

      let loc;
      if (autoDetect) {
        loc = await this.locationService.fetchLocation();
      } else {
        loc = await this.locationService.getLatLngFromAddress(location!);
      }

      if (loc) {
        const dist = Number(distance) || 10;
        const cat = category || 'default';
        const geoPoint = Geohash.encode(loc.latitude, loc.longitude, 9);

        const eventsData = await this.searchService.searchEvents(keyword!, dist, cat, geoPoint);
        if (eventsData._embedded && eventsData._embedded.events) {
          this.searchResults.emit(eventsData._embedded.events);
        } else {
          this.searchResults.emit('no results');
        }
      }
    }
  }

  toggleLocation() {
    this.isLocationHidden = !this.isLocationHidden;
    const locationControl = this.searchForm.get('location');
    if (locationControl) {
      if (this.isLocationHidden) {
        locationControl.clearValidators();
      } else {
        locationControl.setValidators(Validators.required);
      }
      locationControl.updateValueAndValidity();
    }
  }
  
}
