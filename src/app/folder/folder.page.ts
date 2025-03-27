import { Component, inject, OnInit } from '@angular/core';
import { BiometricAuthService } from '../shared/services/biometric-auth.service';
import { AlertController } from '@ionic/angular';
import { AndroidBiometryStrength } from '@aparajita/capacitor-biometric-auth';
import {
  SECURE_STORAGE_KEYS,
  SecureStorageService,
} from '../shared/services/secure-storage.service';
import { AppService } from '../shared/services/app.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: false,
})
export class FolderPage implements OnInit {
  isNewDeviceId: boolean = false;
  isAuthroized: boolean = false;

  deviceId: string = '';
  constructor(
    private biometricAuthService: BiometricAuthService,
    private alertController: AlertController,
    private secureStorageService: SecureStorageService,
    private appService: AppService
  ) {}

  async ngOnInit() {}

  async onAuthenticate() {
    var result = await this.biometricAuthService.IsBiometryAvailable();

    if (result) {
      const options = {
        reason: 'Please verify your identity', // 认证请求的理由
        cancelTitle: 'Cancel', // 取消按钮的文本
        allowDeviceCredential: true, // 允许使用设备密码进行认证
        iosFallbackTitle: 'Use Password', // iOS上的备用选项标题
        androidTitle: 'Biometric Authentication', // Android上的标题
        androidSubtitle: 'Authenticate with biometric credentials', // Android上的副标题
        androidConfirmationRequired: false, // 是否需要确认
        androidBiometryStrength: AndroidBiometryStrength.weak, // Android上生物认证的强度
      };

      const isAuthenticated =
        await this.biometricAuthService.authenticate(options);
      const alert = await this.alertController.create({
        header: isAuthenticated
          ? 'Authentication Successful'
          : 'Authentication Failed',
        message: isAuthenticated
          ? 'You have successfully authenticated'
          : 'Authentication failed, please try again',
        buttons: ['OK'],
      });

      await alert.present();

      if (isAuthenticated) {
        this.isAuthroized = true;
        const isStoredId = await this.secureStorageService.exists(
          SECURE_STORAGE_KEYS.DEVICE_ID
        );

        if (!isStoredId) {
          var res = await this.appService.getDeviceId();

          await this.secureStorageService.setItem(
            SECURE_STORAGE_KEYS.DEVICE_ID,
            res.identifier
          );

          this.isNewDeviceId = true;
        }

        const deviceId = await this.secureStorageService.getItem(
          SECURE_STORAGE_KEYS.DEVICE_ID
        );

        this.deviceId = deviceId!;
      }
    }
  }
}
