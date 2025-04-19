import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'biometric-auth-device-id',
    pathMatch: 'full',
  },
  {
    path: 'biometric-auth-device-id',
    loadChildren: () =>
      import(
        './pages/biometric-auth-device-id/biometric-auth-device-id.module'
      ).then((m) => m.BiometricAuthDeviceIdPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
