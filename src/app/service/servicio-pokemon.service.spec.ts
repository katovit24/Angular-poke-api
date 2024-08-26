import { TestBed } from '@angular/core/testing';

import { ServicioCumplesService } from './servicio-pokemon.service';

describe('ServicioCumplesService', () => {
  let service: ServicioCumplesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioCumplesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
