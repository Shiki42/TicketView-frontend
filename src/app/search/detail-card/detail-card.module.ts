import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { GoogleMapsModule } from '@angular/google-maps'
import { EventDetailComponent } from './event-detail/event-detail.component';
import { DetailCardComponent } from './detail-card.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { VenueDetailComponent } from './venue-detail/venue-detail.component';



@NgModule({
  declarations: [
    EventDetailComponent,
    DetailCardComponent,
    ArtistDetailComponent,
    VenueDetailComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,  
    CarouselModule.forRoot(),
    GoogleMapsModule
  ],
  exports: [DetailCardComponent]
})
export class DetailCardModule { }
