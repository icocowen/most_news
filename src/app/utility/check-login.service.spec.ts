import { TestBed } from '@angular/core/testing';

import { CheckLoginService } from './check-login.service';

describe('CheckLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckLoginService = TestBed.get(CheckLoginService);
    expect(service).toBeTruthy();
  });
});
