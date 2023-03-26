declare global {
  export interface Window {
    KRT_VERSION?: string;
    KRT_IS_NEXT?: string;
  }
}

export const getAppVersion = (): string => {
  return window.KRT_VERSION || 'unknown';
};

export const getIsNextVersion = (): boolean => {
  return window.KRT_IS_NEXT != null && window.KRT_IS_NEXT !== '' && window.KRT_IS_NEXT !== '0' && window.KRT_IS_NEXT.toLowerCase() !== 'false';
};
