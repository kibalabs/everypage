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
      <title>{website.title || `${website.name} - ${website.tagline}`}</title>
      { website.description && <meta name='description' content={website.description} /> }
      { props.fontUrls && props.fontUrls.map((fontUrl: string, index: number): React.ReactElement => (
        <link key={index} href={fontUrl} rel='stylesheet' />
      ))}
    </Helmet>
  );
};
