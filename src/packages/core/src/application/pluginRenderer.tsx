import React from 'react';

import { CrispChat } from '../external/crispChat';
import { EveryviewAnalytics } from '../external/everyviewAnalytics';
import { GithubCorner } from '../external/githubCorner';
import { GoogleAnalytics } from '../external/googleAnalytics';
import { PanelbearAnalytics } from '../external/panelbearAnalytics';
import { TawkToChat } from '../external/tawkToChat';
import { IWebsitePlugin } from '../model';

interface PluginRendererProps {
  plugins: IWebsitePlugin[];
}

export const PluginRenderer = (props: PluginRendererProps): React.ReactElement => {
  return (
    <React.Fragment>
      {props.plugins.map((pluginProps: IWebsitePlugin, index: number): React.ReactElement | null => {
        if (pluginProps.type === 'crisp-chat') {
          return <CrispChat key={index} {...pluginProps} />;
        }
        if (pluginProps.type === 'tawk-to-chat') {
          return <TawkToChat key={index} {...pluginProps} />;
        }
        if (pluginProps.type === 'everyview-analytics') {
          return <EveryviewAnalytics key={index} {...pluginProps} />;
        }
        if (pluginProps.type === 'google-analytics') {
          return <GoogleAnalytics key={index} {...pluginProps} />;
        }
        if (pluginProps.type === 'panelbear-analytics') {
          return <PanelbearAnalytics key={index} {...pluginProps} />;
        }
        if (pluginProps.type === 'github-corner') {
          return <GithubCorner key={index} {...pluginProps} />;
        }
        console.error(`Unrecognized plugin: ${pluginProps.type}`);
        return null;
      })}
    </React.Fragment>
  );
};
