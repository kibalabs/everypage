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

export const getIndexPageStaticProps: GetStaticProps = async (): Promise<{props: IPageProps}> => {
  console.log('process.env', process.env);
  console.log('process.env.NEXT_APP_SITE_FILE', process.env.NEXT_APP_SITE_FILE);
  if (!process.env.NEXT_APP_SITE_FILE) {
    throw Error('NEXT_APP_SITE_FILE env var needs to be set to the path of the site file')
  }
  const siteFilePath = path.join(process.cwd(), process.env.NEXT_APP_SITE_FILE);
  const siteContent = eval('require')(siteFilePath);

  console.log('process.env.NEXT_APP_THEME_FILE', process.env.NEXT_APP_THEME_FILE);
  if (!process.env.NEXT_APP_THEME_FILE) {
    throw Error('NEXT_APP_THEME_FILE env var needs to be set to the path of the site file')
  }
  const themeFilePath = path.join(process.cwd(), process.env.NEXT_APP_THEME_FILE);
  const theme = eval('require')(themeFilePath);

  return {
    props: {
      pageContent: siteContent,
      pageTheme: theme,
    },
  };
};
