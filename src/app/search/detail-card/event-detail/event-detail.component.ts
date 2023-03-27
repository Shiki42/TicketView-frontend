import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent  {
  @Input() eventDetailData: any | null = null;
  @Output() closeCard = new EventEmitter<void>();

  constructor() {}

  getGenres(classification: any): string {
    const names = [classification.subGenre?.name, classification.genre?.name, classification.segment?.name, classification.subType?.name, classification.type?.name];
    const filteredNames = names.filter(name => (name && name !== "Undefined"));
    return filteredNames.join(' | ');
  }

  getPriceRanges(priceRanges: any[]): string {
    return priceRanges.map(price => `${price.min} - ${price.max} USD`).join(', ');
  }

  getTicketStatusClass(statusCode: string): string {
    switch (statusCode.toLowerCase()) {
      case 'onsale':
        return 'on-sale';
      case 'offsale':
        return 'off-sale';
      case 'cancelled':
        return 'cancelled';
      case 'postponed':
        return 'postponed';
      case 'rescheduled':
        return 'rescheduled';
      default:
        return '';
    }
  }
  
  getTicketStatusMessage(statusCode: string): string {
    switch (statusCode.toLowerCase()) {
      case 'onsale':
        return 'On Sale';
      case 'offsale':
        return 'Off Sale';
      case 'cancelled':
        return 'Cancelled';
      case 'postponed':
        return 'Postponed';
      case 'rescheduled':
        return 'Rescheduled';
      default:
        return '';
    }
  }
  
  closeEventDetails() {
    // Implement the logic to close the event details card
  }

  shareOnTwitter() {
    const eventName = this.eventDetailData.name;
    const eventUrl = this.eventDetailData.url;
    const tweetText = `Check ${eventName} on Ticketmaster: ${eventUrl}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, '_blank');
  }
  
  shareOnFacebook() {
    const eventUrl = this.eventDetailData.url;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`;
    window.open(facebookUrl, '_blank');
  }
  
}