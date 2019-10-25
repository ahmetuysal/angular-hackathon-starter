/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { JwtService } from './jwt.service';

describe('Service: Jwt', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtService]
    });
  });

  it('should ...', inject([JwtService], (service: JwtService) => {
    expect(service).toBeTruthy();
  }));
});
