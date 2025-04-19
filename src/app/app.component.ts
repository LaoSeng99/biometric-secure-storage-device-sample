import { Component, OnInit } from '@angular/core';
import {
  SECURE_STORAGE_KEYS,
  SecureStorageService,
} from './shared/services/secure-storage.service';
import { AppService } from './shared/services/app.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  public appPages = [
    {
      title: 'Biometric Authentication',
      url: '/biometric-auth-device-id',
      icon: 'mail',
    },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private secureStorageService: SecureStorageService,
    private appService: AppService
  ) {}

  async ngOnInit() {
    //  this.setDeviceId();
  }

  async setDeviceId() {
    const isStoredId = await this.secureStorageService.exists(
      SECURE_STORAGE_KEYS.DEVICE_ID
    );

    if (!isStoredId) {
      var res = await this.appService.getDeviceId();

      this.secureStorageService.setItem(
        SECURE_STORAGE_KEYS.DEVICE_ID,
        res.identifier
      );
    }

    const deviceId = await this.secureStorageService.getItem(
      SECURE_STORAGE_KEYS.DEVICE_ID
    );

    console.log('My Device Id:', deviceId);
  }
}
