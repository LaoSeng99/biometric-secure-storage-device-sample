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
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
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
