import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EventDetailService } from '../../services/event-detail.service';
import { ArtistService } from 'src/app/services/artist.service';
import { VenueService } from 'src/app/services/venue.service';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.css']
})
export class DetailCardComponent implements OnInit, OnChanges {
  @Input() eventId: string | null = null;

  eventDetailData: any | null = null;
  artistData: any | null = null;
  venueData: any | null = null;

  constructor(private eventDetailService: EventDetailService, private artistService : ArtistService, private venueService : VenueService) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventId'] && this.eventId) {
      this.fetchEventDetails(this.eventId);
    }
  }

  async fetchEventDetails(eventId: string) {
    this.eventDetailData = await this.eventDetailService.fetchEventDetails(eventId);

  }
}
