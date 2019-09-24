import { TestBed } from '@angular/core/testing';

import { AgentrosterService } from './agentroster.service';

describe('AgentrosterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgentrosterService = TestBed.get(AgentrosterService);
    expect(service).toBeTruthy();
  });
});
