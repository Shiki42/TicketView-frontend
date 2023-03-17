import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})

export class SearchResultComponent implements OnInit {
  @Input() eventsData: any;

  sortedColumn = -1;
  sortOrder = 1;

  clearResults() {
    // Clear the search results
  }

  constructor() { }

  ngOnInit(): void {
  }

  displayEvents(): void {
    if (this.eventsData._embedded) {
      this.eventsData = this.eventsData._embedded.events;
    }
  }

  sortTable(columnIndex: number): void {
    if (columnIndex !== this.sortedColumn) {
      this.sortedColumn = columnIndex;
      this.sortOrder = 1;
    } else {
      this.sortOrder = -this.sortOrder;
    }

    this.eventsData.sort((a: any, b: any) => {
      const aValue = this.getColumnField(a, this.sortedColumn);
      const bValue = this.getColumnField(b, this.sortedColumn);
      if (aValue < bValue) {
        return -this.sortOrder;
      } else if (aValue > bValue) {
        return this.sortOrder;
      } else {
        return 0;
      }
    });

    this.displayEvents();
  }

  getColumnField(x: any, columnIndex: number): string {
    switch (columnIndex) {
      case 0:
        return x.dates.start.localDate;
      case 1:
        return ''; // icon column has no field
      case 2:
        return x.name;
      case 3:
        return x.classifications[0].segment.name;
      case 4:
        return x._embedded.venues[0].name;
      default:
        return '';
    }
  }

  displayEventCard(eventId: string, venueName: string): void {
    // Implement displayEventCard logic here.
  }

  getImageUrl(event: any): string | null {
    const image = event.images.find((image: any) => image.width === 305);
    return image ? image.url : null;
  }
}