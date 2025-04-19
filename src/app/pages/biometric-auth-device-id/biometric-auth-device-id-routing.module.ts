import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BiometricAuthDeviceIdPage } from './biometric-auth-device-id.page';

const routes: Routes = [
  {
    path: '',
    component: BiometricAuthDeviceIdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiometricAuthDeviceIdPageRoutingModule {}
