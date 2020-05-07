
export const updateAssetPaths = (siteConfig: Record<string, any>, assetsPrefix: string): Record<string, any> => {
  if (!assetsPrefix) {
    return siteConfig;
  }
  return Object.keys(siteConfig).reduce((result: Record<string, any>, key: string): Record<string, any> => {
    let value = siteConfig[key];
    if (!value) {
      value = value;
    } else if (typeof value === 'string') {
      value = value.startsWith('/assets/') ? value.replace(/^/, assetsPrefix) : value;
    } else if (Array.isArray(value)) {
      value = value.map(entry => updateAssetPaths(entry, assetsPrefix));
    } else if (typeof value === 'object') {
      value = updateAssetPaths(value, assetsPrefix);
    }
    result[key] = value;
    return result
  }, {});
};
