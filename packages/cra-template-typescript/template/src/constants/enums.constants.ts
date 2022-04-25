import ENV from '@app/constants/env.constants';

export const enum StorageStatus {
  EMPTY,
  SET,
  REMOVED,
}

export const STORAGE_KEYS = {
  AUTH: `${ENV.PROJECT_NAME}-admin-login`,
};
