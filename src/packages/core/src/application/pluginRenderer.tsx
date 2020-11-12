import React from 'react';
import { IWebsitePlugin } from '../model';
import { CrispChat } from '../external/crispChat';
import { TawkToChat } from '../external/tawkToChat';
import { EveryviewAnalytics } from '../external/everyviewAnalytics';
import { GoogleAnalytics } from '../external/googleAnalytics';
import { PanelbearAnalytics } from '../external/panelbearAnalytics';

interface PluginRendererProps {
  plugins: IWebsitePlugin[];
}

export const PluginRenderer = (props: PluginRendererProps): React.ReactElement => {
  return (
    <React.Fragment>
      {props.plugins.map((pluginProps: IWebsitePlugin, index: number): React.ReactElement => {
        if (pluginProps.type === 'crisp-chat') {
          return <CrispChat key={index} {...pluginProps} />
        }
        if (pluginProps.type === 'tawk-to-chat') {
          return <TawkToChat key={index} {...pluginProps} />
        }
        if (pluginProps.type === 'everyview-analytics') {
          return <EveryviewAnalytics key={index} {...pluginProps} />
        }
        if (pluginProps.type === 'google-analytics') {
          return <GoogleAnalytics key={index} {...pluginProps} />
        }
        if (pluginProps.type === 'panelbear-analytics') {
          return <PanelbearAnalytics key={index} {...pluginProps} />
        }
        console.error(`Unrecognized plugin: ${pluginProps.type}`)
        return null;
      })}
    </React.Fragment>
  )
};
