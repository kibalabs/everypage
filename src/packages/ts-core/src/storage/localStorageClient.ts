
export class LocalStorageClient {
  private localStorage: Storage;

  constructor(localStorage: Storage) {
    this.localStorage = localStorage;
  }

  public getValue(key: string): string | null {
    return this.localStorage.getItem(key);
  }

  public setValue(key: string, value: string | null | undefined): void {
    if (value === null || value === undefined) {
      this.removeValue(key);
    } else {
      this.localStorage.setItem(key, value);
    }
  }

  public getBoolean(key: string): boolean | null {
    const value = this.getValue(key);
    if (value === '1') {
      return true;
    }
    if (value === '0') {
      return false;
    }
    return null;
  }

  public setBoolean(key: string, value: boolean | null | undefined): void {
    if (value === null || value === undefined) {
      this.removeValue(key);
    } else {
      this.setValue(key, value ? '1' : '0');
    }
  }

  public removeValue(key: string): void {
    this.localStorage.removeItem(key);
  }

  public clear(): void {
    this.localStorage.clear();
  }
}
