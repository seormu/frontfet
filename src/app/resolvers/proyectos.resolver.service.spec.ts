import { TestBed } from '@angular/core/testing';

import { ProyectosResolverService } from './proyectos.resolver.service';

describe('ProyectosResolverService', () => {
  let service: ProyectosResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProyectosResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
