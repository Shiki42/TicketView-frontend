import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchResultComponent } from './search-result/search-result.component';

@NgModule({
  declarations: [SearchComponent, SearchFormComponent, SearchResultComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
