import { TestBed } from '@angular/core/testing';

import { BiometricAuthService } from './biometric-auth.service';

describe('BiometricAuthService', () => {
  let service: BiometricAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiometricAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
