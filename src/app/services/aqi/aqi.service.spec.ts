import { TestBed } from '@angular/core/testing';

import { AqiService } from './aqi.service';

describe('AqiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AqiService = TestBed.get(AqiService);
    expect(service).toBeTruthy();
  });
});
