import { Component } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {

  resultsDisplayed: boolean = false;
  cardDisplayed: boolean = false;

  formCleared: boolean = false;
  formSubmitted: boolean = false;
  cardClosed: boolean = false;
  eventsData: any;
  selectedEventId: string | null = null;


  onClearResults() {   
    this.resultsDisplayed = false;
    this.cardDisplayed = false;
  }

  handleEventDetails(eventId: any) {
    this.selectedEventId = eventId;
    this.resultsDisplayed = false;
    this.cardDisplayed = true;
  }

  handleSearchResults(results: any) {
    this.eventsData = results;
    this.resultsDisplayed = true;
    this.cardDisplayed = false;
  }

  closeEventDetails() {
    this.selectedEventId = null;
    this.resultsDisplayed = true;
    this.cardDisplayed = false;
  }
}
