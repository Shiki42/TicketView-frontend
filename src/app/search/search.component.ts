import { Component, ViewChild } from '@angular/core';
import { SearchResultComponent } from './search-result/search-result.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {

  eventsData: any;
  selectedEventId: string | null = null;

  @ViewChild('searchResultComponent') searchResultComponent!: SearchResultComponent;
  onClearResults() {   
    this.searchResultComponent.clearResults();
  }

  handleEventDetails(eventId: any) {
    this.selectedEventId = eventId;
  }

  handleSearchResults(results: any) {
    this.eventsData = results;
  }

  closeEventDetails() {
    this.selectedEventId = null;
  }
}
