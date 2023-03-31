import { Component, Output, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable, of  } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { LocationService } from '../../services/location.service';
import { SearchService } from '../../services/search.service';
import { AutoCompleteService } from '../../services/auto-complete.service';
import Geohash from '../../services/geohash';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  @Output() clearResults = new EventEmitter<void>();
  @Output() searchResults = new EventEmitter<any>();
  @ViewChild('searchFormElement', { static: true }) searchFormElement!: ElementRef<HTMLFormElement>;

  autoCompleteResults: Observable<string[]>;
  autoCompleteResultsList: string[] = [];

  isLocationHidden = false;

  searchForm = new FormGroup({
    keyword: new FormControl(''),
    distance: new FormControl(''),
    category: new FormControl('default'),
    autoDetect: new FormControl(false),
    location: new FormControl('',Validators.required),
  });

  clear() {
    this.searchForm.setValue({
      keyword: '',
      distance: '',
      category: 'default',
      autoDetect: false,
      location: '',      
    });
    this.searchForm.get('location')!.setValidators(Validators.required);
    this.searchForm.get('location')!.updateValueAndValidity();
    // Emit the custom event to the parent component
    this.clearResults.emit();
  }
  
  constructor(private locationService: LocationService, 
    private searchService: SearchService, private autoCompleteService: AutoCompleteService) {
      this.autoCompleteResults = of([]); 
    }

  ngOnInit(): void {
    this.autoCompleteResults = this.searchForm.controls['keyword'].valueChanges.pipe(
      startWith(''),
      debounceTime(100), // wait for 300ms after the user stops typing
      distinctUntilChanged(), // fetch results only when the keyword value changes
      switchMap((value) => this._filter(value ?? ''))
    );
  }

  private async _filter(value: string): Promise<string[]> {
    if (value.length < 3) {
      return [];
    }
  
    const results = await this.autoCompleteService.fetchAutoCompletes(value);
    const autoCompleteResultsList = results._embedded.attractions.map((attraction:any) => attraction.name);
  
    return autoCompleteResultsList;
  }
  
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
    } else {
      //this.searchForm.markAllAsTouched();
      this.searchFormElement.nativeElement.reportValidity();
    }
  }

  toggleLocation() {
    this.isLocationHidden = !this.isLocationHidden;
    const locationControl = this.searchForm.get('location');
    if (locationControl) {
      if (this.isLocationHidden) {
        locationControl.clearValidators();
        locationControl.setValue('');
        locationControl.disable();
      } else {
        locationControl.setValidators(Validators.required);
        locationControl.enable();
      }
      locationControl.updateValueAndValidity();
    }
  }


  
}
