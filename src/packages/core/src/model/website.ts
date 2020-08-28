export interface IBackgroundLayer {
  color?: string;
  linearGradient?: string;
  radialGradient?: string;
  imageUrl?: string;
  patternImageUrl?: string;
}

// Allow someone to use a single background instead of specifying layers
export interface IBackgroundConfig extends IBackgroundLayer {
  layers?: IBackgroundLayer[];
}

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
