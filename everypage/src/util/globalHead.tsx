import React from 'react';
import Head from 'next/head'

import { useWebsite } from '.';
import { IWebsite } from '../model';


export interface IGlobalHeadProps {
  website?: IWebsite;
  fontUrls?: string[];
}

export const GlobalHead = (props: IGlobalHeadProps): React.ReactElement => {
  const website = props.website || useWebsite();
  return (
    <Head>
      <meta charSet='utf-8' />
      <title>{website.title || `${website.name} - ${website.tagline}`}</title>
      { website.description && <meta name='description' content={website.description} /> }
      { props.fontUrls && props.fontUrls.map((fontUrl: string, index: number): React.ReactElement => (
        <link key={index} href={fontUrl} rel='stylesheet' />
      ))}
    </Head>
  );
};
