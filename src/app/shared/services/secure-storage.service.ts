import { Injectable } from '@angular/core';

import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

@Injectable({
  providedIn: 'root',
})
export class SecureStorageService {
  constructor() {}

  /**
   * 设置安全存储的值
   * @param key 键名
   * @param value 需要存储的值
   */
  async setItem(key: string, value: string): Promise<void> {
    await SecureStoragePlugin.set({ key, value });
  }

  /**
   * 获取存储的值
   * @param key 键名
   * @returns 存储的值（字符串） | null
   */
  async getItem(key: string): Promise<string | null> {
    try {
      const result = await SecureStoragePlugin.get({ key });
      return result.value;
    } catch (error) {
      console.warn(`Key "${key}" not found in secure storage.`);
      return null;
    }
  }

  /**
   * 删除存储的值
   * @param key 键名
   */
  async removeItem(key: string): Promise<void> {
    await SecureStoragePlugin.remove({ key });
  }

  /**
   * 检查键是否存在
   * @param key 键名
   * @returns 是否存在（布尔值）
   */
  async exists(key: string): Promise<boolean> {
    try {
      await SecureStoragePlugin.get({ key });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 清除所有存储的值
   */
  async clear(): Promise<void> {
    await SecureStoragePlugin.clear();
  }
}

export const SECURE_STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER_ID: 'user_id',
  REFRESH_TOKEN: 'refresh_token',
  DEVICE_ID: 'device_id',
};
