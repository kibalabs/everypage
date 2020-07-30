import { RecursivePartial } from '@kibalabs/core';
import { ITheme, buildTheme, mergeThemePartial } from '@kibalabs/ui-react';


export const buildEverypageTheme = (pageTheme: RecursivePartial<ITheme>): ITheme => {
  const everypageTheme: RecursivePartial<ITheme> = {
    'texts': {
      'heroSectionTitle': {
      },
      'sectionTitle': {
      },
      'sectionSubtitle': {
      },
    }
  };
  const theme = buildTheme(mergeThemePartial(everypageTheme, pageTheme));
  return theme;
}
