import { Component, ViewChild } from '@angular/core';
import { SearchResultComponent } from './search-result/search-result.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {

  cardClosed: boolean = true;
  eventsData: any;
  selectedEventId: string | null = null;

  @ViewChild('searchResultComponent') searchResultComponent!: SearchResultComponent;
  onClearResults() {   
    this.searchResultComponent.clearResults();
  }

  handleEventDetails(eventId: any) {
    this.selectedEventId = eventId;
    this.cardClosed = false;
  }

  handleSearchResults(results: any) {
    this.eventsData = results;
  }

  closeEventDetails() {
    console.log('closeEventDetails');
    this.selectedEventId = null;
    this.cardClosed = true;
  }
}
