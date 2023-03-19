import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EventDetailService } from '../../services/event-detail.service';
import { ArtistService } from 'src/app/services/artist.service';
import { VenueService } from 'src/app/services/venue.service';
import { ArtistAlbumService } from 'src/app/services/artist-album.service';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.css']
})
export class DetailCardComponent implements OnInit, OnChanges {
  @Input() eventId: string | null = null;

  eventDetailData: any | null = null;
  artistDataList: any | null = null;
  venueData: any | null = null;

  constructor(private eventDetailService: EventDetailService, private artistService : ArtistService,
     private venueService : VenueService, private albumService : ArtistAlbumService) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventId'] && this.eventId) {
      this.fetchData(this.eventId);
    }
  }

  async fetchData(eventId: string) {
    this.eventDetailData = await this.eventDetailService.fetchEventDetails(eventId);
    this.venueData = await this.venueService.fetchVenueDetails(this.eventDetailData._embedded.venues[0].name);
    this.venueData = this.venueData._embedded.venues[0];
    console.log('venueData', this.venueData)
    this.artistDataList = [];
  
    if (this.eventDetailData._embedded && this.eventDetailData._embedded.attractions) {
      for (const artist of this.eventDetailData._embedded.attractions) {
        if (artist.classifications && artist.classifications[0].segment.name === 'Music') {
          console.log('classifications', artist.classifications)
          this.artistService.fetchArtistDetails(artist.name).then(async (artistResponse: any) => {
            //const matchedArtist = artistResponse.body.artists.items.find(
            //  (item: any) => item.name === artist.name
            //);
            console.log('artistResponse', artistResponse)
            const firstResult = artistResponse.artists.items[0];
            console.log('firstResult', firstResult)
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
              console.log('artistDataList', this.artistDataList)
            }
          });
        }
      }
    }
  }

}
