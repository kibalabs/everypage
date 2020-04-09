import React from 'react';
import { Helmet } from 'react-helmet';


export interface IGlobalHeadProps {
  title: string;
  description?: string;
  fontUrls?: string[];
}

export const GlobalHead = (props: IGlobalHeadProps): React.ReactElement => (
  <Helmet>
    <meta charSet='utf-8' />
    <title>{props.title}</title>
    {props.description && <meta name='description' content={props.description} />}
    { props.fontUrls && props.fontUrls.map((fontUrl: string, index: number): React.ReactElement => (
      <link key={index} href={fontUrl} rel='stylesheet' />
    ))}
  </Helmet>
);
