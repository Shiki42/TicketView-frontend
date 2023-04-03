import { Component, ViewChild } from '@angular/core';
import { MapModalComponent } from './map-modal/map-modal.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {

  @ViewChild(MapModalComponent) mapModal!: MapModalComponent;

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
