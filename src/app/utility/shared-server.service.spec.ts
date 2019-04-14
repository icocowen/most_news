import { TestBed } from '@angular/core/testing';

import { SharedServerService } from './shared-server.service';

describe('SharedServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedServerService = TestBed.get(SharedServerService);
    expect(service).toBeTruthy();
  });
});
