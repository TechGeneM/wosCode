import { TestBed } from '@angular/core/testing';

import { AgenttypeService } from './agenttype.service';

describe('AgenttypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgenttypeService = TestBed.get(AgenttypeService);
    expect(service).toBeTruthy();
  });
});
