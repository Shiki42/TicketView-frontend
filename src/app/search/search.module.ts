import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { DetailCardModule } from './detail-card/detail-card.module';

@NgModule({
  declarations: [SearchComponent, SearchFormComponent, SearchResultComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DetailCardModule
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
