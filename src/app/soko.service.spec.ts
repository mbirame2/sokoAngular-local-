import { TestBed } from '@angular/core/testing';

import { SokoService } from './soko.service';

describe('SokoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SokoService = TestBed.get(SokoService);
    expect(service).toBeTruthy();
  });
});
