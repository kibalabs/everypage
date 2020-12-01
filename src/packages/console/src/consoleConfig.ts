
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

export const consoleConfig: IConsoleConfig = {
  plans: [{
    planIndex: 1,
    name: 'Core',
    code: 'core',
    priceMonthly: 0,
    priceYearly: 0,
    priceCodeMonthly: 'monthly',
    priceCodeYearly: 'yearly',
    siteLimit: 3,
    hasCustomDomain: false,
    hasNoBranding: false,
    isPurchasable: true,
    highlightFeature: 'get your pages published',
    features: [
    ],
  }, {
    planIndex: 2,
    name: 'Starter',
    code: 'starter',
    priceMonthly: 500,
    priceYearly: 5000,
    priceCodeMonthly: 'monthly',
    priceCodeYearly: 'yearly',
    siteLimit: 20,
    hasCustomDomain: true,
    hasNoBranding: false,
    isPurchasable: true,
    highlightFeature: 'host pages on your own domain',
    features: [
    ],
  }, {
    planIndex: 3,
    name: 'Premium',
    code: 'premium',
    priceMonthly: 2000,
    priceYearly: 20000,
    priceCodeMonthly: 'monthly',
    priceCodeYearly: 'yearly',
    siteLimit: 50,
    hasCustomDomain: true,
    hasNoBranding: true,
    isPurchasable: true,
    highlightFeature: 'remove everypage branding',
    features: [
    ],
  // }, {
  //   planIndex: 4,
  //   name: 'Ultimate',
  //   code: 'ultimate',
  //   priceMonthly: 5000,
  //   priceYearly: 50000,
  //   priceCodeMonthly: 'monthly',
  //   priceCodeYearly: 'yearly',
  //   siteLimit: 100,
  //   hasCustomDomain: true,
  //   hasNoBranding: true,
  //   isPurchasable: false,
  //   highlightFeature: 'run a/b tests on your sites',
  //   features: [
  //   ],
  }]
}
