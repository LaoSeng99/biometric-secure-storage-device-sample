import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  /**
   * 获取设备唯一标识符
   * @returns Promise<DeviceId> - 返回设备的唯一标识符
   */
  async getDeviceId() {
    const id = await Device.getId();
    return id;
  }

  /**
   * 检测设备环境
   * @returns Promise<boolean> - 如果设备环境是模拟器，返回 true
   */
  async isSimulator() {
    const info = await Device.getInfo();
    return info.isVirtual;
  }

  /**
   * 获取设备基本信息
   * @returns Promise<DeviceInfo> - 返回设备的操作系统、平台等信息
   */
  async getDeviceInfo() {
    const info = await Device.getInfo();
    return info;
  }

  /**
   * 获取设备电池信息
   * @returns Promise<BatteryInfo> - 返回设备的电池电量和充电状态
   */
  async getBatteryInfo() {
    const batteryInfo = await Device.getBatteryInfo();

    return batteryInfo;
  }

  /**
   * 获取设备当前语言代码
   * @returns Promise<GetLanguageCodeResult> - 返回设备的语言代码（如 en, zh）
   */
  async getLanguageCode() {
    const languageCode = await Device.getLanguageCode();

    return languageCode;
  }

  /**
   * 获取设备当前语言标签
   * @returns Promise<LanguageTag> - 返回设备的语言标签（如 en-US, zh-CN）
   */
  async getLanguageTag() {
    const languageTag = await Device.getLanguageTag();
    return languageTag; // 返回语言标签
  }

  isAndroidPlatform() {
    return Capacitor.getPlatform() === 'android';
  }

  isIOSPlatform() {
    return Capacitor.getPlatform() === 'ios';
  }

  isNativeApp() {
    if (Capacitor.isNativePlatform()) {
      document.body.classList.add('native-app');
      return true;
    }
    return false;
  }

  isWebApp() {
    if (!Capacitor.isNativePlatform()) {
      document.body.classList.add('web-app');
      return true;
    }
    return false;
  }
}
