import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter  } from '@angular/core';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})

export class SearchResultComponent implements OnInit, OnChanges {
  isHidden: boolean = false;
  @Input() eventsData: any;
  @Output() selectedEventId = new EventEmitter<string>();





  sortedColumn = -1;
  sortOrder = 1;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventsData']) {
      this.sortTable(0)
    }
  }

  displayEventCard(eventId: string, event: MouseEvent): void {
    event.preventDefault();
    this.selectedEventId.emit(eventId);
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



  getImageUrl(event: any): string | null {
    const image = event.images.find((image: any) => image.width === 305);
    return image ? image.url : null;
  }
}