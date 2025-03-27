import { Injectable } from '@angular/core';
import {
  AuthenticateOptions,
  BiometricAuth,
  BiometryError,
  CheckBiometryResult,
} from '@aparajita/capacitor-biometric-auth';

@Injectable({
  providedIn: 'root',
})
export class BiometricAuthService {
  constructor() {}

  /**
   * 检查设备是否支持生物识别
   * 返回一个布尔值，表示生物识别是否可用
   */
  async IsBiometryAvailable(): Promise<boolean> {
    try {
      const result = await this.checkBiometry();
      return result.isAvailable && result.biometryTypes.length > 0;
    } catch (error) {
      console.error('Error checking biometry availability:', error);
      return false;
    }
  }

  /**
   * 执行生物识别身份验证
   * @param reason - 提示信息
   * @returns 是否验证通过
   */
  async authenticate(options: AuthenticateOptions): Promise<boolean> {
    try {
      await BiometricAuth.authenticate(options);
      console.log('身份验证成功');
      return true;
    } catch (error) {
      if (error instanceof BiometryError) {
        console.error('Biometry Error:', error);
      }
      return false;
    }
  }

  /**
   * 注册应用恢复监听器
   * 当应用恢复时重新检查生物识别可用性
   */
  async addResumeListener() {
    const listener = await BiometricAuth.addResumeListener(async () => {
      const result = await this.checkBiometry();
      console.log('恢复后生物识别状态:', result);
    });
    console.log('恢复监听器已注册');
  }

  /**
   * 检查设备是否已经启用设备凭证（如PIN、密码）
   * 这对于多层安全验证非常有用
   */
  async isDeviceSecure(): Promise<boolean> {
    try {
      const result = await BiometricAuth.checkBiometry();
      return result.deviceIsSecure;
    } catch (error) {
      console.error('检查设备安全性失败:', error);
      return false;
    }
  }

  async testBiometryType() {
    try {
      // Simulate the biometric type (e.g., fingerprint, face)
      await BiometricAuth.setBiometryType('iris'); // Can also use 'face' or 'iris'
      console.log('Biometric type set for testing');

      // Proceed with authentication
      const isAuthenticated = await this.authenticate({
        reason: 'Please authenticate for testing',
        cancelTitle: 'Cancel',
      });

      if (isAuthenticated) {
        console.log('Authentication success');
      } else {
        console.log('Authentication failed');
      }
    } catch (error) {
      console.error('Error during biometric authentication test:', error);
    }
  }

  /**
   * 检查设备支持的生物识别类型
   * 返回 CheckBiometryResult 包含是否支持生物识别及支持的生物识别类型
   */
  private async checkBiometry(): Promise<CheckBiometryResult> {
    try {
      const result = await BiometricAuth.checkBiometry();
      console.log('Biometry check result:', result);
      return result;
    } catch (error) {
      console.error('Error checking biometry:', error);
      throw error;
    }
  }
}
