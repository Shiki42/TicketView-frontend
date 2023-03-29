import { Component, Input, OnInit, ElementRef, Renderer2, ViewChild, AfterViewChecked } from '@angular/core';
import { GapiKey} from '../../../services/apikey';
import { ModalDirective } from 'ngx-bootstrap/modal';
declare var google: any;
@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.scss']
})
export class VenueDetailComponent implements OnInit, AfterViewChecked  {
  @Input() venueData: any | null = null;
  @ViewChild('mapModal', { static: false }) mapModal!: ModalDirective;

  mapOptions!: google.maps.MapOptions;

  showMoreOpenHours: boolean = false;
  showMoreGeneralRule: boolean = false;
  showMoreChildRule: boolean = false;

  showMoreButton = {
    openHours: false,
    generalRule: false,
    childRule: false,
  };

  contentLengthLimit = 100; 
  maxWidth: number = 50 * 8;
  showGoogleMap = false;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  isContentLong(content: string): boolean {
    if (content) {
      return content.length > this.contentLengthLimit;
    }
    return false;
  }

  ngOnInit(): void {
    this.loadGoogleMapsScript();
    this.mapOptions = {
      zoom: 14,
    };
  }

  private checkedOverflow = false;

  ngAfterViewChecked(): void {
    if (!this.checkedOverflow) {
      this.showMoreButton.openHours = this.isContentOverflow('openHours');
      this.showMoreButton.generalRule = this.isContentOverflow('generalRule');
      this.showMoreButton.childRule = this.isContentOverflow('childRule');
      this.checkedOverflow = true;
    }
  }
  
  loadGoogleMapsScript(): void {
    if (!document.querySelector(`[src="https://maps.googleapis.com/maps/api/js?key=${GapiKey}"]`)) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GapiKey}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }

  showModal() {
    (this.mapModal as any).show();
  }
  
  hideModal() {
    (this.mapModal as any).hide();
  }

  toggleShowMore(type: string): void {
    switch (type) {
      case 'openHours':
        this.showMoreOpenHours = !this.showMoreOpenHours;
        break;
      case 'generalRule':
        this.showMoreGeneralRule = !this.showMoreGeneralRule;
        break;
      case 'childRule':
        this.showMoreChildRule = !this.showMoreChildRule;
        break;
    }
  }

  isContentOverflow(type: string): boolean {
    const contentElement = this.el.nativeElement.querySelector(`.detail-text-${type}`);
    if (contentElement) {
      console.log('contentElement', contentElement.offsetHeight, contentElement.scrollHeight)
      return contentElement.offsetHeight < contentElement.scrollHeight;
    }  
    return false;
  }

  toNumber(value: string): number {
    return parseFloat(value);
  }
}
