import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BiometricAuthDeviceIdPageRoutingModule } from './biometric-auth-device-id-routing.module';

import { BiometricAuthDeviceIdPage } from './biometric-auth-device-id.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BiometricAuthDeviceIdPageRoutingModule
  ],
  declarations: [BiometricAuthDeviceIdPage]
})
export class BiometricAuthDeviceIdPageModule {}
