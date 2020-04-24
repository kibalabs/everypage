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
  if (!process.env.EVERYPAGE_SITE_FILE) {
    throw Error('EVERYPAGE_SITE_FILE env var needs to be set to the path of the site file')
  }
  const siteContent = eval('require')(process.env.EVERYPAGE_SITE_FILE);

  if (!process.env.EVERYPAGE_THEME_FILE) {
    throw Error('EVERYPAGE_THEME_FILE env var needs to be set to the path of the site file')
  }
  const theme = eval('require')(process.env.EVERYPAGE_THEME_FILE);

  return {
    props: {
      pageContent: siteContent,
      pageTheme: theme,
    },
  };
};
