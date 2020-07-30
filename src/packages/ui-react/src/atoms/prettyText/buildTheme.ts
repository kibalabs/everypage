import { RecursivePartial } from '@kibalabs/core';

import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
import { ITextTheme } from '../../subatoms';
import { IColorGuide } from '../../subatoms/colors';
import { IDimensionGuide } from '../../subatoms/dimensions';
import { IPrettyTextTheme } from './theme';

export const buildPrettyTextThemes = (colors: IColorGuide, dimensions: IDimensionGuide, textThemes: ThemeMap<ITextTheme>, base: RecursivePartial<Record<string, IPrettyTextTheme>>): ThemeMap<IPrettyTextTheme> => {
  const prettyTextTheme = mergeTheme<IPrettyTextTheme>({
    normal: {
      default: {
        text: mergeTheme<ITextTheme>(textThemes.default, {
          'margin': '1em 0',
        }),
      },
      emphasis: {
        text: textThemes.emphasis,
      },
      strong: {
        text: textThemes.strong,
      },
    },
  }, base?.default);

  const derivedThemes = Object.keys(textThemes).reduce((currentMap: Record<string, RecursivePartial<IPrettyTextTheme>>, textMode: string): Record<string, RecursivePartial<IPrettyTextTheme>> => {
    currentMap[textMode] = mergeThemePartial({
      normal: {
        default: {
          text: textThemes[textMode],
        }
      }
    }, base?.['textMode']);
    return currentMap;
  }, {});

  derivedThemes.header1 = mergeThemePartial(derivedThemes.header1, {
    normal: {
      default: {
        text: {
          'margin': '0.67em 0',
        },
      },
      strong: {
        text: {
          'color': colors.brandPrimary,
        },
      },
    },
  }, base?.header1);

  derivedThemes.header2 = mergeThemePartial(derivedThemes.header2, {
    normal: {
      default: {
        text: {
          'margin': '0.83em 0',
        },
      },
    },
  }, base?.header2);

  derivedThemes.header3 = mergeThemePartial(derivedThemes.header3, {
    normal: {
      default: {
        text: {
          'margin': '1em 0 0.5em 0',
        },
      },
    },
  }, base?.header3);

  derivedThemes.header4 = mergeThemePartial(derivedThemes.header4, {
    normal: {
      default: {
        text: {
          'margin': '1em 0 0.5em 0',
        },
      },
    },
  }, base?.header4);

  derivedThemes.header5 = mergeThemePartial(derivedThemes.header5, {
    normal: {
      default: {
        text: {
          'margin': '1em 0 0.5em 0',
        },
      },
    },
  }, base?.header5);

  derivedThemes.header6 = mergeThemePartial(derivedThemes.header6, {
    normal: {
      default: {
        text: {
          'margin': '1em 0 0.5em 0',
        },
      },
    },
  }, base?.header6);

  return {
    ...base,
    ...derivedThemes,
    default: prettyTextTheme,
  };
}
