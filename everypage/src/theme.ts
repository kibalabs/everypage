import { ITextTheme } from 'components/text';
import { mergeTheme } from './util';


export const textTheme: ITextTheme = {
  'font-size': '1em',
  'font-family': '"Montserrat", sans-serif',
  'font-weight': 'normal',
  'color': '#777777',
  'line-height': '1.6em',
};

export const headerTextTheme: ITextTheme = mergeTheme(textTheme, {
  'font-size': '2.5em',
  'font-weight': '700',
  'color': '#373737',
  'line-height': '1.2em',
});


const theme = {
  texts: {
    text: textTheme,
    header: headerTextTheme,
  }
};

export default theme;
