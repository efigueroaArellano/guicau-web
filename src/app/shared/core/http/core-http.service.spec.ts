import { TestBed } from '@angular/core/testing';

import { CoreHttpService } from './core-http.service';

describe('CoreHttpService', () => {
  let service: CoreHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
