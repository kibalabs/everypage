import { RecursivePartial } from '@kibalabs/core';

import { IFont } from './theme';

export const buildFonts = (base?: RecursivePartial<Record<string, IFont>>): Record<string, IFont> => {
  return Object.keys(base || {}).reduce((current: Record<string, IFont>, name: string): Record<string, IFont> => {
    if (base[name] && base[name].url) {
      current[name] = {url: base[name].url.replace('//fonts.googleapis.com/', '//assets.evrpg.com/gfonts/')};
    }
    return current;
  }, {} as Record<string, IFont>);
}
