import { ITextTheme } from 'components/text';
import { mergeTheme } from './util';
import { IBackgroundTheme } from 'components/background';

const BRAND_COLOR = '#1C8F51';
const BRAND_COLOR_2 = '#1A6F6F';

export const brandBackground: IBackgroundTheme = {
  color: BRAND_COLOR,
}

export const brandLinearGradientBackground: IBackgroundTheme = {
  linearGradient: {
    angle: 180,
    startColor: BRAND_COLOR,
    endColor: BRAND_COLOR_2,
  }
}

export const brandRadialGradientBackground: IBackgroundTheme = {
  color: BRAND_COLOR,
}

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
  backgrounds: {
    brand: brandBackground,
    brandLinearGradient: brandLinearGradientBackground,
    brandRadialGradient: brandRadialGradientBackground,
  },
  texts: {
    text: textTheme,
    header: headerTextTheme,
  },
};

export default theme;
