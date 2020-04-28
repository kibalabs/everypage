import React from 'react';
import { Helmet } from 'react-helmet';

import { useWebsite } from '../util';
import { IWebsite } from '../model';


export interface IGlobalHeadProps {
  website?: IWebsite;
  fontUrls?: string[];
}

export const GlobalHead = (props: IGlobalHeadProps): React.ReactElement => {
  const website = props.website || useWebsite();
  return (
    <Helmet>
      <meta charSet='utf-8' />
      <meta name='author' content={website.company} />
      <meta name='copyright' content={website.company} />
      <meta name='attribution' content='Made with everypage. Visit https://www.everypagehq.com' />
      <meta name='ep-version' content={process.env.PACKAGE_VERSION} />
      { website.keywords && <meta name='keywords' content={website.keywords.join(', ')} /> }
      { website.version && <meta name='version' content={website.version} /> }
      { website.description && <meta name='description' content={website.description} /> }
      <title>{website.title || `${website.name} - ${website.tagline}`}</title>
      { props.fontUrls && props.fontUrls.map((fontUrl: string, index: number): React.ReactElement => (
        <link key={index} href={fontUrl} rel='stylesheet' />
      ))}
    </Helmet>
  );
};
