
const ASSET_CONTENT_REGEX = /\((\/assets\/[-a-zA-Z0-9@:%_+.~#?&/=]*)\)/g;

export const updateAssetPath = (assetPath: string, assetsPrefix: string): string => {
  return assetPath.replace(/^/, assetsPrefix);
};

export const updateAssetPaths = (siteConfig: Record<string, unknown>, assetsPrefix: string): Record<string, unknown> => {
  if (!assetsPrefix) {
    return siteConfig;
  }
  const newSiteContent = Object.keys(siteConfig).reduce((result: Record<string, unknown>, key: string): Record<string, unknown> => {
    const resultCopy = result;
    let value = siteConfig[key];
    if (!value) {
      // Do nothing.
    } else if (typeof value === 'string') {
      if (value.startsWith('/assets/')) {
        value = updateAssetPath(value, assetsPrefix);
      } else {
        // Replace any instances of (/assets/...) with the prefixed version for markdown
        value = value.replace(ASSET_CONTENT_REGEX, (match: string, capture: string): string => {
          return `(${updateAssetPath(capture, assetsPrefix)})`;
        });
      }
    } else if (Array.isArray(value)) {
      value = value.map((entry) => (typeof entry === 'object' ? updateAssetPaths(entry, assetsPrefix) : entry));
    } else if (typeof value === 'object') {
      value = updateAssetPaths(value as Record<string, unknown>, assetsPrefix);
    }
    resultCopy[key] = value;
    return resultCopy;
  }, {});
  return newSiteContent;
};

// NOTE(krishan711): These replacement functions are because in canvas the images are stored locally so cant just be a prefix.
export const replaceAssetPath = (assetPath: string, assetReplacements: Record<string, string>): string => {
  return assetReplacements[assetPath] ? assetReplacements[assetPath] : assetPath;
};

export const replaceAssetPaths = (siteConfig: Record<string, unknown>, assetReplacements: Record<string, string>): Record<string, unknown> => {
  if (!assetReplacements) {
    return siteConfig;
  }
  const newSiteContent = Object.keys(siteConfig).reduce((result: Record<string, unknown>, key: string): Record<string, unknown> => {
    const resultCopy = result;
    let value = siteConfig[key];
    if (!value) {
      // Do nothing.
    } else if (typeof value === 'string') {
      if (value.startsWith('/assets/')) {
        value = replaceAssetPath(value, assetReplacements);
      } else {
        // Replace any instances of (/assets/...) with the prefixed version for markdown
        value = value.replace(ASSET_CONTENT_REGEX, (match: string, capture: string): string => {
          return `(${replaceAssetPath(capture, assetReplacements)})`;
        });
      }
    } else if (Array.isArray(value)) {
      value = value.map((entry) => (typeof entry === 'object' ? replaceAssetPaths(entry, assetReplacements) : entry));
    } else if (typeof value === 'object') {
      value = replaceAssetPaths(value as Record<string, unknown>, assetReplacements);
    }
    resultCopy[key] = value;
    return resultCopy;
  }, {});
  return newSiteContent;
};
