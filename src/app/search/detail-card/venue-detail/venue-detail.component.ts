import { Component, Input, OnInit, ElementRef, Renderer2, ViewChild, AfterViewChecked, AfterViewInit,OnChanges, SimpleChanges } from '@angular/core';
import { GapiKey} from '../../../services/apikey';
import { ModalDirective } from 'ngx-bootstrap/modal';

declare var google: any;
@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.scss']
})
export class VenueDetailComponent implements OnInit  {
  @Input() venueData: any | null = null;
  @ViewChild('mapModal', { static: false }) mapModal!: ModalDirective;

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
/*
  initializeMutationObserver(type: string): void {
    const contentElement = this.el.nativeElement.querySelector(`.detail-text-${type}`);
    if (contentElement) {
      console.log('contentElement:', contentElement);
      const observer = new MutationObserver(() => {
        this.updateButtonVisibility();
      });
  
      observer.observe(contentElement, { childList: true, subtree: true });
    }
  }

  ngAfterViewInit(): void {
    this.initializeMutationObserver('openHours');
    this.initializeMutationObserver('generalRule');
    this.initializeMutationObserver('childRule');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['venueData']) {
      //this.isHidden = false;
      //this.shouldCheckOverflow = true;
    }
  }
*/
  private shouldCheckOverflow: boolean = false;

  //ngAfterViewChecked(): void {
    //if (this.shouldCheckOverflow) {
      //setTimeout(() => {
      //this.overflowOpenHours = this.isContentOverflow('openHours');
      //this.overflowGeneralRule = this.isContentOverflow('generalRule');
      //this.overflowChildRule = this.isContentOverflow('childRule');
      //this.shouldCheckOverflow = false;
      //});
    //}
  //}
  
  showGoogleMap = false;
  constructor(private el: ElementRef, private renderer: Renderer2) {}


  ngOnInit(): void {
    this.loadGoogleMapsScript();
    this.mapOptions = {
      zoom: 14,
    };
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

  // updateButtonVisibility(): void {
  //   this.showMoreButton.openHours = this.isContentOverflow('openHours');
  //   this.showMoreButton.generalRule = this.isContentOverflow('generalRule');
  //   this.showMoreButton.childRule = this.isContentOverflow('childRule');
  // }

  // isContentOverflow(type: string): boolean {

  
  //   console.log('isContentOverflow', type)
  //   const contentElement = this.el.nativeElement.querySelector(`.detail-text-${type}`);
  //   if (contentElement) {
  //     console.log('contentElement', contentElement.offsetHeight, contentElement.scrollHeight )
  //     return contentElement.offsetHeight > 48;
  //   }  
  //   return false;
  // }

  toNumber(value: string): number {
    return parseFloat(value);
  }
}
