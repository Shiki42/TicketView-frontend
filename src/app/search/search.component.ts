import { Component, ViewChild } from '@angular/core';
import { SearchResultComponent } from './search-result/search-result.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  @ViewChild('searchResultComponent') searchResultComponent!: SearchResultComponent;
  onClearResults() {   
    this.searchResultComponent.clearResults();
  }

  eventsData: any;

  handleSearchResults(results: any) {
    this.eventsData = results;
  }
}
