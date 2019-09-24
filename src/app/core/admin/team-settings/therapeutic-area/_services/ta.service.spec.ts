import { TestBed } from '@angular/core/testing';

import { TaService } from './ta.service';

describe('TaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaService = TestBed.get(TaService);
    expect(service).toBeTruthy();
  });
});
