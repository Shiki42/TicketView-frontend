import { TestBed } from '@angular/core/testing';

import { ArtistAlbumService } from './artist-album.service';

describe('ArtistAlbumService', () => {
  let service: ArtistAlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistAlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
