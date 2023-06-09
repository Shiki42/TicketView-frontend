import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatTabsModule } from '@angular/material/tabs';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
    ModalModule.forRoot(),
    MatTabsModule, 
    BrowserAnimationsModule, 
    CarouselModule.forRoot(),
    GoogleMapsModule,
    MatProgressSpinnerModule
  ],
  exports: [DetailCardComponent]
})
export class DetailCardModule { }
