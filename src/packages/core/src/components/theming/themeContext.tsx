import React from 'react';

import { ITheme, ThemeType } from '..';
import { ISingleAnyChildProps } from '@kibalabs/core-react';
;

export const ThemeContext = React.createContext<ITheme | null>(null);

interface IThemeProviderProps extends ISingleAnyChildProps {
  theme: ITheme;
}

export const ThemeProvider = (props: IThemeProviderProps): React.ReactElement => (
  <ThemeContext.Provider value={props.theme}>
    {props.children}
  </ThemeContext.Provider>
);

export function useTheme<Theme extends ThemeType>(...themePathParts: string[]): Theme {
  const theme = React.useContext(ThemeContext);
  if (!theme) {
    throw Error('No theme has been set!');
  }
  return themePathParts.reduce((themePart: ThemeType, pathPart: string): ThemeType => {
    if (!(pathPart in themePart)) {
      // TODO(rikhil): show the whole path so far as well.
      throw Error(`Could not find theme part "${pathPart}" in current theme.`);
    }
    return themePart[pathPart] as ThemeType;
  }, theme) as Theme;
}
