
export interface IPlan {
  name: string;
  code: string;
  monthlyPrice: string;
  yearlyPrice: string;
  highlightFeature: string;
  siteLimit: number;
  hasCustomDomain: boolean;
  hasNoBranding: boolean;
  isPurchasable: boolean;
}

export interface IConsoleConfig {
  plans: IPlan[],
}
