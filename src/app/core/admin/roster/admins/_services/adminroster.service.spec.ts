import { TestBed } from '@angular/core/testing';

import { AdminrosterService } from './adminroster.service';

describe('AdminrosterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminrosterService = TestBed.get(AdminrosterService);
    expect(service).toBeTruthy();
  });
});
