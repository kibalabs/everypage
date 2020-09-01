import { RecursivePartial } from '@kibalabs/core';

import { mergeTheme, mergeThemePartial, ThemeMap } from '../../util';
import { IColorGuide } from '../colors';
import { IDimensionGuide } from '../dimensions';
import { ITextTheme } from './theme';

export const buildTextThemes = (colors: IColorGuide, dimensions: IDimensionGuide, base: RecursivePartial<Record<string, ITextTheme>>): ThemeMap<ITextTheme> => {
  const textTheme = mergeTheme<ITextTheme>({
    'font-size': dimensions.fontSize,
    'font-family': '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Asans-serif',
    'font-weight': 'normal',
    'color': '$colors.text',
    'line-height': '1.5em',
    'text-decoration': 'none',
    'margin': '0',
    'text-align': 'inherit',
    'text-shadow': 'inherit',
    'text-transform': 'inherit',
  }, base?.default);

  const inlineTextTheme = mergeThemePartial<ITextTheme>({
  }, base?.inline);

  const paragraphTextTheme = mergeThemePartial<ITextTheme>({
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

  const header1TextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '3.0rem',
    'font-weight': '800',
    'color': '$colors.text',
    'line-height': '1.2em',
  }, base?.header1);

  const headerTextTheme = mergeThemePartial(header1TextTheme, base?.header);

  const header2TextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '2.0rem',
    'font-weight': '700',
    'color': '$colors.text',
    'line-height': '1.2em',
  }, base?.header2);

  const titleTextTheme = mergeThemePartial(header2TextTheme, base?.title);

  const header3TextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '1.4rem',
    'font-weight': '700',
    'color': '$colors.text',
    'line-height': '1.2em',
  }, base?.header3);

  const subtitleTextTheme = mergeThemePartial(header3TextTheme, base?.subtitle);

  const header4TextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '1.3rem',
    'font-weight': '600',
    'color': '$colors.text',
    'text-decoration': 'underline',
    'line-height': '1.2em',
  }, base.header4);

  const header5TextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '1.2rem',
    'font-weight': '600',
    'color': '$colors.text',
    'line-height': '1.2em',
  }, base.header5);

  const header6TextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '1.1rem',
    'font-weight': '600',
    'color': '$colors.text',
    'line-height': '1.2em',
  }, base.header6);

  const noteTextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '0.8rem',
    'color': '#777777',
  }, base?.note);

  const supersizeTextTheme = mergeThemePartial<ITextTheme>({
    'font-size': '3rem',
  }, base?.supersize);

  const unmarginedTextTheme = mergeThemePartial<ITextTheme>({
    'margin': '0',
  }, base?.unmargined);

  const marginedTextTheme = mergeThemePartial<ITextTheme>({
    'margin': '1em 0 0.5em 0',
  }, base?.margined);

  const coloredTextTheme = mergeThemePartial<ITextTheme>({
    'color': colors.brandPrimary,
  }, base?.colored);

  return {
    ...base,
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
    unmargined: unmarginedTextTheme,
    margined: marginedTextTheme,
    colored: coloredTextTheme,
  };
}
