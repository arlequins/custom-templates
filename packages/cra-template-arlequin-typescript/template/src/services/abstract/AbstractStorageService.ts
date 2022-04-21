import { StorageStatus } from '@app/constants/enums.constants';
import { AnyObjectType } from '@typings/arlequin';

export default class AbstractStorageService {
  private key: string;
  private source: Storage;
  private status: StorageStatus;
  public isActive = true;

  constructor(key: string, source: Storage) {
    this.key = key;
    this.source = source;
    this.status = StorageStatus.EMPTY;

    if (!(key && source)) {
      this.isActive = false;
      return;
    }

    this.checkItem();
  }

  private parseData = (str: string | null) => {
    if (!str) {
      return undefined;
    }
    try {
      return JSON.parse(str);
    } catch (e) {
      return undefined;
    }
  };

  private checkItem = () => {
    const fetchData = this.getItem();

    if (!fetchData) {
      this.status = StorageStatus.EMPTY;
    } else {
      this.status = StorageStatus.SET;
    }
  };

  public getItem = () => {
    const fetchStorage = this.source.getItem(this.key);
    return this.parseData(fetchStorage);
  };

  public setItem = (data: AnyObjectType) => {
    this.source.setItem(this.key, JSON.stringify(data));
    this.status = StorageStatus.SET;
  };
  public removeItem = () => {
    this.source.removeItem(this.key);
    this.status = StorageStatus.REMOVED;
  };
  public statusItem = () => {
    return this.status;
  };
}
