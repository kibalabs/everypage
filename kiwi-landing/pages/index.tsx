import path from 'path'
import { GetStaticProps } from 'next'

import { IndexPage, IPageProps } from '@kibalabs/everypage';
import defaultTheme from './theme';
export default IndexPage;

// NOTE(krish): why does process.env not work if we use this instead:
// import { getIndexPageStaticProps } from '@kibalabs/everypage';
// export const getStaticProps = getIndexPageStaticProps;

export const getStaticProps: GetStaticProps = async (): Promise<{props: IPageProps}> => {
  if (!process.env.NEXT_APP_SITE_FILE) {
    throw Error('NEXT_APP_SITE_FILE env var needs to be set to the path of the site file')
  }
  const siteFilePath = path.join(process.cwd(), process.env.NEXT_APP_SITE_FILE);
  const siteContent = eval('require')(siteFilePath);

  // if (!process.env.NEXT_APP_THEME_FILE) {
  //   throw Error('NEXT_APP_THEME_FILE env var needs to be set to the path of the site file')
  // }
  // const themeFilePath = path.join(process.cwd(), process.env.NEXT_APP_THEME_FILE);
  // const theme = eval('require')(themeFilePath);

  return {
    props: {
      pageContent: siteContent,
      pageTheme: defaultTheme,
    },
  };
};
