import { mergeTheme, mergeThemePartial, RecursivePartial, ThemeMap } from '../../util';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';
import { ITextTheme } from './theme';

export const buildTextThemes = (colors: IColorGuide, dimensions: IDimensionGuide, base: RecursivePartial<Record<string, ITextTheme>>): ThemeMap<ITextTheme> => {
  const textTheme: ITextTheme = mergeTheme({
    'font-size': dimensions.fontSize,
    'font-family': '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Asans-serif',
    'font-weight': 'normal',
    'color': colors.text,
    'line-height': '1.5em',
    'text-decoration': 'none',
    'margin': '0',
  }, base?.default);

  const inverseTextTheme = mergeThemePartial<ITextTheme>({
    'color': colors.textInverse,
  }, base?.inverse);

  const inlineTextTheme = mergeThemePartial<ITextTheme>({
  }, base?.inline);

  const paragraphTextTheme = mergeThemePartial<ITextTheme>({
    'margin': '0.5em 0',
  }, base?.paragraph);

  const boldTextTheme = mergeThemePartial<ITextTheme>({
    'font-weight': 'bold',
  }, base?.bold);

  const strongTextTheme = mergeThemePartial<ITextTheme>({
    'font-weight': 'bold',
  }, base?.strong);

  const italicTextTheme = mergeThemePartial<ITextTheme>({
    'font-style': 'italic',
  }, base?.italic);

  const emphasisTextTheme = mergeThemePartial<ITextTheme>({
    'font-style': 'italic',
  }, base?.emphasis);

  const underlineTextTheme = mergeThemePartial<ITextTheme>({
    'text-decoration': 'underline',
  }, base?.underline);

  const markTextTheme = mergeThemePartial<ITextTheme>({
  }, base?.mark);

  const smallTextTheme = mergeThemePartial<ITextTheme>({
    'font-size': 'smaller',
  }, base?.small);

  const deletedTextTheme = mergeThemePartial<ITextTheme>({
    'text-decoration': 'line-through',
  }, base?.deleted);

  const insertedTextTheme = mergeThemePartial<ITextTheme>({
    'text-decoration': 'underline',
  }, base?.inserted);

  const subscriptTextTheme = mergeThemePartial<ITextTheme>({
    'vertical-align': 'sub',
    'font-size': 'smaller',
  }, base?.subscript);

  const superscriptTextTheme = mergeThemePartial<ITextTheme>({
    'vertical-align': 'super',
    'font-size': 'smaller',
  }, base?.superscript);

  // /////////////

  const headerTextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '2.4em',
    'font-weight': 'bold',
    'color': '#171717',
    'margin': '0.67em 0',
    'line-height': '1.2em',
  }, base?.header);

  const header1TextTheme = headerTextTheme;

  const titleTextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '2.0em',
    'font-weight': 'bold',
    'color': '#171717',
    'margin': '0.67em 0',
    'line-height': '1.2em',
  }, base?.title);

  const header2TextTheme = titleTextTheme;

  const subtitleTextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '1.6em',
    'font-weight': 'bold',
    'color': '#171717',
    'margin': '0.5em 0',
    'line-height': '1.2em',
  }, base?.subtitle);

  const header3TextTheme = subtitleTextTheme;

  const header4TextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '1.4em',
    'font-weight': 'bold',
    'color': '#171717',
    'text-decoration': 'underline',
    'line-height': '1.2em',
    'margin': '0.4em 0',
  });

  const header5TextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '1.2em',
    'font-weight': 'bold',
    'color': '#171717',
    'line-height': '1.2em',
    'margin': '0.3em 0',
  });

  const header6TextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '1.1em',
    'font-weight': 'bold',
    'color': '#171717',
    'line-height': '1.2em',
    'margin': '0.2em 0',
  });

  const noteTextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '0.8em',
    'color': '#777777',
  }, base?.note);

  const supersizeTextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '3em',
  }, base?.supersize);

  return {
    default: textTheme,
    paragraph: paragraphTextTheme,
    inline: inlineTextTheme,
    bold: boldTextTheme,
    strong: strongTextTheme,
    italic: italicTextTheme,
    emphasis: emphasisTextTheme,
    underline: underlineTextTheme,
    mark: markTextTheme,
    small: smallTextTheme,
    deleted: deletedTextTheme,
    inserted: insertedTextTheme,
    subscript: subscriptTextTheme,
    superscript: superscriptTextTheme,
    inverse: inverseTextTheme,
    header: headerTextTheme,
    title: titleTextTheme,
    subtitle: subtitleTextTheme,
    header1: header1TextTheme,
    header2: header2TextTheme,
    header3: header3TextTheme,
    header4: header4TextTheme,
    header5: header5TextTheme,
    header6: header6TextTheme,
    note: noteTextTheme,
    supersize: supersizeTextTheme,
  };
}
