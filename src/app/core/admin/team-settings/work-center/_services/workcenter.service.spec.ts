import { TestBed } from '@angular/core/testing';

import { WorkcenterService } from './workcenter.service';

describe('WorkcenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkcenterService = TestBed.get(WorkcenterService);
    expect(service).toBeTruthy();
  });
});
