import { RecursivePartial } from '@kibalabs/core';
import { ITheme, buildTheme, mergeThemePartial } from '@kibalabs/ui-react';


export const buildEverypageTheme = (pageTheme: RecursivePartial<ITheme>): ITheme => {
  const everypageTheme: RecursivePartial<ITheme> = {
    'texts': {
      'sectionSubtitle': {
        'margin': '0.5em 0',
      }
    }
  };
  const theme = buildTheme(mergeThemePartial(everypageTheme, pageTheme));
  return theme;
}
