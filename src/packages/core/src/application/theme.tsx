import { RecursivePartial } from '@kibalabs/core';
import { buildTheme, ITheme, mergeThemePartial } from '@kibalabs/ui-react';


export const buildEverypageTheme = (pageTheme: RecursivePartial<ITheme>): ITheme => {
  const everypageTheme: RecursivePartial<ITheme> = {
    dimensions: {
      paddingHeroTop: '7em',
      paddingHeroBottom: '7em',
      paddingSectionTop: '5em',
      paddingSectionBottom: '5em',
    },
    boxes: {
      iconHolder: {
        background: '$colors.brandPrimary',
        padding: '0.8em',
      },
    },
    texts: {
      heroSectionTitle: {
      },
      sectionTitle: {
      },
      sectionSubtitle: {
      },
      light: {
        color: '$colors.textLight25',
      },
    },
    colors: {
      sectionBackground: 'rgba(0, 0, 0, 0)',
    },
    alternateColors: {
      everypageAttribution: {
        text: '#ffffff',
        background: '#000000',
        sectionBackground: '#000000',
        brandPrimary: '#ffffff',
      },
    },
  };
  const theme = buildTheme(mergeThemePartial(everypageTheme, pageTheme));
  return theme;
};
