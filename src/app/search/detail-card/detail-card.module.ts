import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { DetailCardComponent } from './detail-card.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';



@NgModule({
  declarations: [
    EventDetailComponent,
    DetailCardComponent,
    ArtistDetailComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,  
    CarouselModule.forRoot(),
  ],
  exports: [DetailCardComponent]
})
export class DetailCardModule { }
