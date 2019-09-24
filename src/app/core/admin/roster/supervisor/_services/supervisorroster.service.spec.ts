import { TestBed } from '@angular/core/testing';

import { SupervisorrosterService } from './supervisorroster.service';

describe('SupervisorrosterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupervisorrosterService = TestBed.get(SupervisorrosterService);
    expect(service).toBeTruthy();
  });
});
