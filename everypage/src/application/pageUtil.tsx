import path from 'path'
import { GetStaticProps } from 'next'

import { IWebsite } from '../model';
import { ISectionProps } from '../sections';
import { ITheme } from '../components';

export interface IPageProps {
  pageContent: IWebsite & {
    sections: ISectionProps[]
  }
  pageTheme: ITheme;
}

export const getIndexPageStaticProps: GetStaticProps = async (context): Promise<{props: IPageProps}> => {
  if (!process.env.EVERYPAGE_SITE_FILE) {
    throw Error('EVERYPAGE_SITE_FILE env var needs to be set to the path of the site file')
  }
  const siteFilePath = path.join(process.cwd(), process.env.EVERYPAGE_SITE_FILE);
  const siteContent = eval('require')(siteFilePath);

  if (!process.env.EVERYPAGE_THEME_FILE) {
    throw Error('EVERYPAGE_THEME_FILE env var needs to be set to the path of the site file')
  }
  const themeFilePath = path.join(process.cwd(), process.env.EVERYPAGE_THEME_FILE);
  const theme = eval('require')(themeFilePath);

  return {
    props: {
      pageContent: siteContent,
      pageTheme: theme,
    },
  };
};
