
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
  plugins?: IWebsitePlugin[];
  sections?: IWebsiteSection[];
}

export interface IWebsitePlugin {
  type: string;
}

export interface IWebsiteSection {
  type: string;
}
