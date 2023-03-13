import { IBackgroundConfig } from '@kibalabs/ui-react';

export interface IWebsiteMeta {
  name: string;
  tagline: string;
  company: string;
  version?: string;
  keywords?: string[];
  title?: string;
  description?: string;
  companyUrl?: string;
  twitterUsername?: string;
  twitterCompanyUsername?: string;
  socialCardImageUrl?: string;
  faviconImageUrl?: string;
  iosAppId?: string;
  androidAppId?: string;
  macAppId?: string;
  baseUrl?: string;
}

export interface IWebsiteSection {
  type: string;
  id?: string;
  className?: string;
  background?: IBackgroundConfig;
  shouldStickToTop?: boolean;
  isFullHeight?: boolean;
  isInverse?: boolean;
  colorVariant?: string;
  [key: string]: unknown;
}

export interface IWebsite extends IWebsiteMeta {
  buildHash: string;
  siteHost: string;
  shouldUseGeneratedFavicons?: boolean;
  shouldHideAttribution?: boolean;
  plugins?: IWebsitePlugin[];
  sections?: IWebsiteSection[];
  background?: IBackgroundConfig;
}

export interface IWebsitePlugin {
  type: string;
  [key: string]: unknown;
}

export const getMetaFromWebsite = (website: IWebsite): IWebsiteMeta => {
  return {
    name: website.name,
    tagline: website.tagline,
    company: website.company,
    version: website.version,
    keywords: website.keywords,
    title: website.title,
    description: website.description,
    companyUrl: website.companyUrl,
    twitterUsername: website.twitterUsername,
    twitterCompanyUsername: website.twitterCompanyUsername,
    socialCardImageUrl: website.socialCardImageUrl,
    faviconImageUrl: website.faviconImageUrl,
    iosAppId: website.iosAppId,
    androidAppId: website.androidAppId,
    macAppId: website.macAppId,
  };
};
