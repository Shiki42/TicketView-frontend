import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueDetailComponent } from './venue-detail.component';

describe('VenueDetailComponent', () => {
  let component: VenueDetailComponent;
  let fixture: ComponentFixture<VenueDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenueDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VenueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
