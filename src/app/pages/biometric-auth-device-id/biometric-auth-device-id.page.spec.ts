import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BiometricAuthDeviceIdPage } from './biometric-auth-device-id.page';

describe('BiometricAuthDeviceIdPage', () => {
  let component: BiometricAuthDeviceIdPage;
  let fixture: ComponentFixture<BiometricAuthDeviceIdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BiometricAuthDeviceIdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
