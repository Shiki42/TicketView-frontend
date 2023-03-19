import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { EventDetailService } from '../../../services/event-detail.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnChanges {
  @Input() eventId: string | null = null;
  @Output() closeCard = new EventEmitter<void>();

  eventDetailData: any;

  constructor(private eventDetailService: EventDetailService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventId'] && this.eventId) {
      this.fetchEventDetails(this.eventId);
    }
  }

  async fetchEventDetails(eventId: string) {
    const eventDeventDetailData = await this.eventDetailService.fetchEventDetails(eventId);

    // Implement the displayCardInfo() function from your original JS code here
  }

  closeEventDetails() {
    // Implement the logic to close the event details card
  }
}