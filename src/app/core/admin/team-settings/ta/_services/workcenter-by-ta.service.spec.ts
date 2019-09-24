import { TestBed } from '@angular/core/testing';

import { WorkcenterByTaService } from './workcenter-by-ta.service';

describe('WorkcenterByTaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkcenterByTaService = TestBed.get(WorkcenterByTaService);
    expect(service).toBeTruthy();
  });
});
