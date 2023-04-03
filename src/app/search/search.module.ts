import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GoogleMapsModule } from '@angular/google-maps'
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { DetailCardModule } from './detail-card/detail-card.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MapModalComponent } from './map-modal/map-modal.component';

@NgModule({
  declarations: [SearchComponent, SearchFormComponent, SearchResultComponent, MapModalComponent],
  imports: [
    CommonModule,
    GoogleMapsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    DetailCardModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
