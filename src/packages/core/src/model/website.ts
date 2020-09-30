import { IBackgroundConfig } from '@kibalabs/ui-react';

export interface IWebsite {
  name: string;
  tagline: string;
  company: string;
  buildHash: string;
  siteHost: string;
  shouldHideAttribution?: boolean;
  version?: string;
  keywords?: string[];
  companyUrl?: string;
  title?: string;
  description?: string;
  twitterUsername?: string;
  twitterCompanyUsername?: string;
  socialCardImageUrl?: string;
  faviconImageUrl?: string;
  iosAppId?: string;
  androidAppId?: string;
  macAppId?: string;
  plugins?: IWebsitePlugin[];
  sections?: IWebsiteSection[];
  background?: IBackgroundConfig;
}

export interface IWebsitePlugin {
  type: string;
  [key: string]: any;
}

export interface IWebsiteSection {
  type: string;
  [key: string]: any;
}
