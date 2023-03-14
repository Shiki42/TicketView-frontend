import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchFormComponent } from './search-form/search-form.component';


@NgModule({
  declarations: [SearchComponent, SearchFormComponent],
  imports: [
    CommonModule
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
