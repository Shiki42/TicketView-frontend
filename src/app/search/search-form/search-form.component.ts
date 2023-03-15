import { Component, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {
  @Output() clearResults = new EventEmitter<void>();

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
