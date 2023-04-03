import { Component, Input, OnInit, ElementRef, Renderer2, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { GapiKey} from '../../../services/apikey';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MapService } from './mapService';

declare var google: any;
@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.scss']
})
export class VenueDetailComponent implements OnInit, OnChanges  {
  @Input() venueData: any | null = null;
  @ViewChild('mapModal', { static: false }) mapModal!: ModalDirective;
  @Output() openMapModal = new EventEmitter<any>();

  mapOptions!: google.maps.MapOptions;

  

  overflowOpenHours: boolean = false;
  overflowGeneralRule: boolean = false;
  overflowChildRule: boolean = false;

  contentLengthLimit = 90; 

  isContentLong(content: string): boolean {
    if (content) {
      return content.length > this.contentLengthLimit;
    }
    return false;
  }

  showMoreButton = {
    openHours: false,
    generalRule: false,
    childRule: false,
  };

  private shouldCheckOverflow: boolean = false;
 
  showGoogleMap = false;
  constructor(private el: ElementRef, private renderer: Renderer2, private mapService: MapService) {}

  get isMapJSloaded(): boolean {
    return this.mapService.MapJSloaded;
  }

  //MapJSloaded = false;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['venueData'] && this.venueData) {
    }
  }

  ngOnInit(): void {
    if (!this.mapService.MapJSloaded) {
      this.loadGoogleMapsScript().then(() => {
        this.mapService.MapJSloaded = true;
        this.mapOptions = {
          zoom: 14,
        };
        console.log('ngOnInit, this.mapService.MapJSloaded', this.mapService.MapJSloaded);
      });
    } else {
      this.mapOptions = {
        zoom: 14,
      };
    }
  }
  loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve) => {
      const scriptSrc = `https://maps.googleapis.com/maps/api/js?key=${GapiKey}&callback=initGoogleMapsApi`;
  
      if (!document.querySelector(`[src="${scriptSrc}"]`)) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptSrc;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
  
      (window as any).initGoogleMapsApi = () => {
        this.mapOptions = {
          zoom: 14,
        };
        resolve();
      };
    });
  }
  
  openModal() {
    this.openMapModal.emit(this.venueData);
  }

  toggleShowMore(type: string): void {
    switch (type) {
      case 'openHours':
        this.showMoreButton.openHours = !this.showMoreButton.openHours;
        break;
      case 'generalRule':
        this.showMoreButton.generalRule = !this.showMoreButton.generalRule;
        break;
      case 'childRule':
        this.showMoreButton.childRule = !this.showMoreButton.childRule;
        break;
    }
  }

  toNumber(value: string): number {
    return parseFloat(value);
  }
}
