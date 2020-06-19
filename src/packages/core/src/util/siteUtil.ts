
const ASSET_CONTENT_REGEX = /\((\/assets\/[-a-zA-Z0-9\@\:\%\_\+\.\~\#\?\&\/\=]*)\)/;

export const updateAssetPaths = (siteConfig: Record<string, any>, assetsPrefix: string): Record<string, any> => {
  if (!assetsPrefix) {
    return siteConfig;
  }
  return Object.keys(siteConfig).reduce((result: Record<string, any>, key: string): Record<string, any> => {
    let value = siteConfig[key];
    if (!value) {
      // Do nothing.
    } else if (typeof value === 'string') {
      if (value.startsWith('/assets/')) {
        // Add prefix to whole string
        value = value.replace(/^/, assetsPrefix);
      } else {
        // Replace any instances of (/assets/...) with the prefixed version for markdown
        value = value.replace(ASSET_CONTENT_REGEX, `(${assetsPrefix}$1)`);
      }
    } else if (Array.isArray(value)) {
      value = value.map(entry => updateAssetPaths(entry, assetsPrefix));
    } else if (typeof value === 'object') {
      value = updateAssetPaths(value, assetsPrefix);
    }
    result[key] = value;
    return result
  }, {});
};

export const replaceAssetPath = (assetPath: string, assetReplacements: Record<string, string>): string => {
  return assetReplacements[assetPath] ? assetReplacements[assetPath] : assetPath;
}

export const replaceAssetPaths = (siteConfig: Record<string, any>, assetReplacements: Record<string, string>): Record<string, any> => {
  if (!assetReplacements) {
    return siteConfig;
  }
  const newSiteContent = Object.keys(siteConfig).reduce((result: Record<string, any>, key: string): Record<string, any> => {
    let value = siteConfig[key];
    if (!value) {
      // Do nothing.
    } else if (typeof value === 'string') {
      if (value.startsWith('/assets/')) {
        // Add prefix to whole string
        value = replaceAssetPath(value, assetReplacements);
      } else {
        // Replace any instances of (/assets/...) with the prefixed version for markdown
        value = value.replace(ASSET_CONTENT_REGEX, (match: string, capture: string): string => {
          return `(${replaceAssetPath(capture, assetReplacements)})`;
        });
      }
    } else if (Array.isArray(value)) {
      value = value.map(entry => typeof entry === 'object' ? replaceAssetPaths(entry, assetReplacements) : entry);
    } else if (typeof value === 'object') {
      value = replaceAssetPaths(value, assetReplacements);
    }
    result[key] = value;
    return result
  }, {});
  return newSiteContent;
};
