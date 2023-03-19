import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { DetailCardComponent } from './detail-card.component';



@NgModule({
  declarations: [
    EventDetailComponent,
    DetailCardComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule
  ],
  exports: [DetailCardComponent]
})
export class DetailCardModule { }
