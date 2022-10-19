import { TestBed } from '@angular/core/testing';

import { JsonWebTokenService } from './json-web-token.service';

describe('JsonWebTokenService', () => {
  let service: JsonWebTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonWebTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
