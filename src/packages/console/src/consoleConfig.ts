
export interface IPlan {
  planIndex: number;
  name: string;
  code: string;
  priceMonthly: number;
  priceYearly: number;
  priceCodeMonthly: string;
  priceCodeYearly: string;
  highlightFeature: string;
  siteLimit: number;
  hasCustomDomain: boolean;
  hasNoBranding: boolean;
  isPurchasable: boolean;
  features: string[],
}

export interface IConsoleConfig {
  plans: IPlan[],
}
