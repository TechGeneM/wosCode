import { TestBed } from '@angular/core/testing';

import { AgentroleService } from './agentrole.service';

describe('AgentroleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgentroleService = TestBed.get(AgentroleService);
    expect(service).toBeTruthy();
  });
});
