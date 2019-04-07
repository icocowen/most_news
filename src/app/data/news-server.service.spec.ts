import { TestBed } from '@angular/core/testing';

import { NewsServerService } from './news-server.service';

describe('NewsServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsServerService = TestBed.get(NewsServerService);
    expect(service).toBeTruthy();
  });
});
