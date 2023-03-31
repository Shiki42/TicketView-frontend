import { Component, Input, Output, OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { EventDetailService } from '../../services/event-detail.service';
import { ArtistService } from 'src/app/services/artist.service';
import { VenueService } from 'src/app/services/venue.service';
import { ArtistAlbumService } from 'src/app/services/artist-album.service';

interface FavoriteEvent {
  date: Date;
  event: string;
  category: string;
  venue: string;
}

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.css']
})
export class DetailCardComponent implements OnInit, OnChanges {
  
  @Input() eventId: string | null = null;
  @Output() cardClosed  = new EventEmitter<void>();

  alertMessage = '';
  isFavorite: boolean = false;
  isHidden: boolean = false;
  showAlert = false;

  eventDetailData: any | null = null;
  artistDataList: any | null = null;
  venueData: any | null = null;

  constructor(private eventDetailService: EventDetailService, private artistService : ArtistService,
    private venueService : VenueService, private albumService : ArtistAlbumService) {}

  ngOnInit(): void {
    this.initializeFavoriteEvents();
    this.checkIfEventIsFavorite();
  }

  initializeFavoriteEvents() {
    const favoriteEventsKey = 'favorite_events';
    if (!localStorage.getItem(favoriteEventsKey)) {
      localStorage.setItem(favoriteEventsKey, JSON.stringify([]));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventId'] && this.eventId) {
      //this.isHidden = false;
      this.fetchData(this.eventId);
      this.checkIfEventIsFavorite();
    }
  }

  async fetchData(eventId: string) {
    this.eventDetailData = await this.eventDetailService.fetchEventDetails(eventId);
    const venueDataRes = await this.venueService.fetchVenueDetails(this.eventDetailData._embedded.venues[0].name);
    this.venueData = venueDataRes._embedded.venues[0];
    console.log('detail-card venueData', this.venueData)
    this.artistDataList = [];
  
    if (this.eventDetailData._embedded && this.eventDetailData._embedded.attractions) {
      for (const artist of this.eventDetailData._embedded.attractions) {
        if (artist.classifications && artist.classifications[0].segment.name === 'Music') {
          //console.log('classifications', artist.classifications)
          this.artistService.fetchArtistDetails(artist.name).then(async (artistResponse: any) => {
            //const matchedArtist = artistResponse.body.artists.items.find(
            //  (item: any) => item.name === artist.name
            //);
            //console.log('artistResponse', artistResponse)
            const firstResult = artistResponse.artists.items[0];
            //console.log('firstResult', firstResult)
            if (firstResult) {
              const artistData = {
                image: firstResult.images[0],
                name: firstResult.name,
                popularity: firstResult.popularity,
                followers: firstResult.followers.total,
                spotifyUrl: firstResult.external_urls.spotify,                
                albumCoverImages: []
              };
  
              const albums = await this.albumService.fetchArtistAlbum(firstResult.id);
              artistData.albumCoverImages = albums.items.map((album: any) => album.images[0]);
  
              this.artistDataList.push(artistData);
            }
          });
        }
      }
    }
  }

  toggleFavoriteEvent() {
    this.showAlert = true;
    const favoriteEventsKey = 'favorite_events';
    let favoriteEvents: FavoriteEvent[] = JSON.parse(localStorage.getItem(favoriteEventsKey) || '[]');

    this.checkIfEventIsFavorite();

    const event: FavoriteEvent = {
      date: this.eventDetailData.dates.start.localDate, 
      event: this.eventDetailData.name, 
      category: this.getGenres(this.eventDetailData.classifications[0]), 
      venue: this.eventDetailData._embedded.venues[0].name, 
    };


    if (!this.isFavorite) {
      favoriteEvents.push(event);
      localStorage.setItem(favoriteEventsKey, JSON.stringify(favoriteEvents));
      this.isFavorite = true;
      this.alertMessage = 'Event Added to Favorites!';
    } else {
      favoriteEvents = favoriteEvents.filter((e) => e.event !== event.event);
      localStorage.setItem(favoriteEventsKey, JSON.stringify(favoriteEvents));
      this.isFavorite = false;
      this.alertMessage = 'Removed from Favorites!';
    }
    
  }

  checkIfEventIsFavorite() {
    const favoriteEventsKey = 'favorite_events';
    const favoriteEvents: FavoriteEvent[] = JSON.parse(localStorage.getItem(favoriteEventsKey) || '[]');
    this.isFavorite = favoriteEvents.some((e) => e.event === this.eventDetailData.name);
  }

  getGenres(classification: any): string {
    const names = [classification.subGenre?.name, classification.genre?.name, classification.segment?.name, classification.subType?.name, classification.type?.name];
    const filteredNames = names.filter(name => (name && name !== "Undefined"));
    return filteredNames.join(' | ');
  }

  closeAlert() {
    this.showAlert = false;
  }
  
  backClicked(): void {
    this.cardClosed.emit();
    //this.isHidden = true;
  }

}
