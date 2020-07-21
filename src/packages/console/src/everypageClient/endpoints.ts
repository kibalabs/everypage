import { RequestData, ResponseData } from '@kibalabs/core';

import * as Resources from './resources';

export class LoginUserRequest extends RequestData {
  readonly email: string;
  readonly password: string;

  public constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
  }

  public toObject = (): Record<string, any> => {
    return {
      email: this.email,
      password: this.password,
    };
  }
}

export class LoginUserResponse extends ResponseData {
  public static fromObject = (obj: Record<string, any>): LoginUserResponse => {
    return new LoginUserResponse(
    );
  }
}

export class LogoutUserRequest extends RequestData {
  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class LogoutUserResponse extends ResponseData {
  public static fromObject = (obj: Record<string, any>): LogoutUserResponse => {
    return new LogoutUserResponse(
    );
  }
}

export class CreateUserRequest extends RequestData {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly shouldJoinNewsletter?: boolean;

  public constructor(firstName: string, lastName: string, email: string, password: string, shouldJoinNewsletter?: boolean) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.shouldJoinNewsletter = shouldJoinNewsletter;
  }

  public toObject = (): Record<string, any> => {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      shouldJoinNewsletter: this.shouldJoinNewsletter !== undefined ? this.shouldJoinNewsletter : null,
    };
  }
}

export class CreateUserResponse extends ResponseData {
  public static fromObject = (obj: Record<string, any>): CreateUserResponse => {
    return new CreateUserResponse(
    );
  }
}

export class RefreshTokenRequest extends RequestData {
  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class RefreshTokenResponse extends ResponseData {
  public static fromObject = (obj: Record<string, any>): RefreshTokenResponse => {
    return new RefreshTokenResponse(
    );
  }
}

export class SendEmailVerificationForUserRequest extends RequestData {
  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class SendEmailVerificationForUserResponse extends ResponseData {
  public static fromObject = (obj: Record<string, any>): SendEmailVerificationForUserResponse => {
    return new SendEmailVerificationForUserResponse(
    );
  }
}

export class RetrieveAccountsRequest extends RequestData {
  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class RetrieveAccountsResponse extends ResponseData {
  readonly accounts: Resources.Account[];

  public constructor(accounts: Resources.Account[]) {
    super();
    this.accounts = accounts;
  }

  public static fromObject = (obj: Record<string, any>): RetrieveAccountsResponse => {
    return new RetrieveAccountsResponse(
      obj.accounts.map((account: Record<string, any>): Resources.Account => Resources.Account.fromObject(account)),
    );
  }
}

export class GetAccountRequest extends RequestData {
  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class GetAccountResponse extends ResponseData {
  readonly account: Resources.Account;

  public constructor(account: Resources.Account) {
    super();
    this.account = account;
  }

  public static fromObject = (obj: Record<string, any>): GetAccountResponse => {
    return new GetAccountResponse(
      Resources.Account.fromObject(obj.account),
    );
  }
}

export class CreateSubscriptionForAccountRequest extends RequestData {
  readonly planCode: string;
  readonly priceCode: string;
  readonly stripePaymentMethodId: string;
  readonly couponCode?: string;

  public constructor(planCode: string, priceCode: string, stripePaymentMethodId: string, couponCode?: string) {
    super();
    this.planCode = planCode;
    this.priceCode = priceCode;
    this.stripePaymentMethodId = stripePaymentMethodId;
    this.couponCode = couponCode;
  }

  public toObject = (): Record<string, any> => {
    return {
      planCode: this.planCode,
      priceCode: this.priceCode,
      stripePaymentMethodId: this.stripePaymentMethodId,
      couponCode: this.couponCode,
    };
  }
}

export class CreateSubscriptionForAccountResponse extends ResponseData {
  readonly stripeSubscription: Resources.StripeSubscription;

  public constructor(stripeSubscription: Resources.StripeSubscription) {
    super();
    this.stripeSubscription = stripeSubscription;
  }

  public static fromObject = (obj: Record<string, any>): CreateSubscriptionForAccountResponse => {
    return new CreateSubscriptionForAccountResponse(
      Resources.StripeSubscription.fromObject(obj.stripeSubscription),
    );
  }
}

export class ChangeSubscriptionForAccountRequest extends RequestData {
  readonly planCode: string;
  readonly priceCode: string;
  readonly couponCode?: string;

  public constructor(planCode: string, priceCode: string, couponCode?: string) {
    super();
    this.planCode = planCode;
    this.priceCode = priceCode;
    this.couponCode = couponCode;
  }

  public toObject = (): Record<string, any> => {
    return {
      planCode: this.planCode,
      priceCode: this.priceCode,
      couponCode: this.couponCode,
    };
  }
}

export class ChangeSubscriptionForAccountResponse extends ResponseData {
  readonly stripeSubscription: Resources.StripeSubscription;

  public constructor(stripeSubscription: Resources.StripeSubscription) {
    super();
    this.stripeSubscription = stripeSubscription;
  }

  public static fromObject = (obj: Record<string, any>): ChangeSubscriptionForAccountResponse => {
    return new ChangeSubscriptionForAccountResponse(
      Resources.StripeSubscription.fromObject(obj.stripeSubscription),
    );
  }
}
export class CreatePortalSessionForAccountRequest extends RequestData {
  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class CreatePortalSessionForAccountResponse extends ResponseData {
  readonly stripePortalSession: Resources.StripePortalSession;

  public constructor(stripePortalSession: Resources.StripePortalSession) {
    super();
    this.stripePortalSession = stripePortalSession;
  }

  public static fromObject = (obj: Record<string, any>): CreatePortalSessionForAccountResponse => {
    return new CreatePortalSessionForAccountResponse(
      Resources.StripePortalSession.fromObject(obj.stripePortalSession),
    );
  }
}


export class RetrieveSitesForAccountRequest extends RequestData {
  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class RetrieveSitesForAccountResponse extends ResponseData {
  readonly sites: Resources.Site[];

  public constructor(sites: Resources.Site[]) {
    super();
    this.sites = sites;
  }

  public static fromObject = (obj: Record<string, any>): RetrieveSitesForAccountResponse => {
    return new RetrieveSitesForAccountResponse(
      obj.sites.map((site: Record<string, any>): Resources.Site => Resources.Site.fromObject(site)),
    );
  }
}


export class CreateSiteRequest extends RequestData {
  readonly accountId: number;
  readonly slug: string;
  readonly name?: string;
  readonly templateId?: number;

  public constructor(accountId: number, slug: string, name?: string, templateId?: number) {
    super();
    this.accountId = accountId;
    this.slug = slug;
    this.name = name;
    this.templateId = templateId;
  }

  public toObject = (): Record<string, any> => {
    return {
      accountId: this.accountId,
      slug: this.slug,
      name: this.name,
      templateId: this.templateId,
    };
  }
}

export class CreateSiteResponse extends ResponseData {
  readonly site: Resources.Site;

  public constructor(site: Resources.Site) {
    super();
    this.site = site;
  }

  public static fromObject = (obj: Record<string, any>): CreateSiteResponse => {
    return new CreateSiteResponse(
      Resources.Site.fromObject(obj.site),
    );
  }
}

export class CreateSiteVersionRequest extends RequestData {
  readonly siteContent?: Record<string, any>;
  readonly siteTheme?: Record<string, any>;
  readonly name?: string;
  readonly templateId?: number;

  public constructor(siteContent?: Record<string, any>, siteTheme?: Record<string, any>, name?: string, templateId?: number) {
    super();
    this.siteContent = siteContent;
    this.siteTheme = siteTheme;
    this.name = name;
    this.templateId = templateId;
  }

  public toObject = (): Record<string, any> => {
    return {
      siteContent: this.siteContent,
      siteTheme: this.siteTheme,
      name: this.name,
      templateId: this.templateId,
    };
  }
}

export class CreateSiteVersionResponse extends ResponseData {
  readonly siteVersion: Resources.SiteVersion;

  public constructor(siteVersion: Resources.SiteVersion) {
    super();
    this.siteVersion = siteVersion;
  }

  public static fromObject = (obj: Record<string, any>): CreateSiteVersionResponse => {
    return new CreateSiteVersionResponse(
      Resources.SiteVersion.fromObject(obj.siteVersion),
    );
  }
}

export class RetrieveNextVersionNameRequest extends RequestData {
  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class RetrieveNextVersionNameResponse extends ResponseData {
  readonly nextVersionName: string;

  public constructor(nextVersionName: string) {
    super();
    this.nextVersionName = nextVersionName;
  }

  public static fromObject = (obj: Record<string, any>): RetrieveNextVersionNameResponse => {
    return new RetrieveNextVersionNameResponse(
      String(obj.nextVersionName),
    );
  }
}

export class ListSiteVersionAssetsRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class ListSiteVersionAssetsResponse extends ResponseData {
  readonly assetFiles: Resources.AssetFile[];

  public constructor(assetFiles: Resources.AssetFile[]) {
    super();
    this.assetFiles = assetFiles;
  }

  public static fromObject = (obj: Record<string, any>): ListSiteVersionAssetsResponse => {
    return new ListSiteVersionAssetsResponse(
      obj.assetFiles.map((siteVersion: Record<string, any>): Resources.AssetFile => Resources.AssetFile.fromObject(siteVersion)),
    );
  }
}

export class PromoteSiteVersionRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class PromoteSiteVersionResponse extends ResponseData {
  public constructor() {
    super();
  }

  public static fromObject = (obj: Record<string, any>): PromoteSiteVersionResponse => {
    return new PromoteSiteVersionResponse(
    );
  }
}

export class CloneSiteVersionRequest extends RequestData {
  readonly name?: string;

  public constructor(name?: string) {
    super();
    this.name = name;
  }

  public toObject = (): Record<string, any> => {
    return {
      name: this.name,
    };
  }
}

export class CloneSiteVersionResponse extends ResponseData {
  readonly siteVersion: Resources.SiteVersion;

  public constructor(siteVersion: Resources.SiteVersion) {
    super();
    this.siteVersion = siteVersion;
  }

  public static fromObject = (obj: Record<string, any>): CloneSiteVersionResponse => {
    return new CloneSiteVersionResponse(
      Resources.SiteVersion.fromObject(obj.siteVersion),
    );
  }
}

export class GenerateAssetUploadForSiteVersionRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class GenerateAssetUploadForSiteVersionResponse extends ResponseData {
  readonly presignedUpload: Resources.PresignedUpload;

  public constructor(presignedUpload: Resources.PresignedUpload) {
    super();
    this.presignedUpload = presignedUpload;
  }

  public static fromObject = (obj: Record<string, any>): GenerateAssetUploadForSiteVersionResponse => {
    return new GenerateAssetUploadForSiteVersionResponse(
      Resources.PresignedUpload.fromObject(obj.presignedUpload),
    );
  }
}


export class GetSiteRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class GetSiteResponse extends ResponseData {
  readonly site: Resources.Site;

  public constructor(site: Resources.Site) {
    super();
    this.site = site;
  }

  public static fromObject = (obj: Record<string, any>): GetSiteResponse => {
    return new GetSiteResponse(
      Resources.Site.fromObject(obj.site),
    );
  }
}

export class UpdateDomainForSiteRequest extends RequestData {
  readonly customDomain: string;

  public constructor(customDomain: string) {
    super();
    this.customDomain = customDomain;
  }

  public toObject = (): Record<string, any> => {
    return {
      customDomain: this.customDomain,
    };
  }
}

export class UpdateDomainForSiteResponse extends ResponseData {
  readonly site: Resources.Site;

  public constructor(site: Resources.Site) {
    super();
    this.site = site;
  }

  public static fromObject = (obj: Record<string, any>): GetSiteResponse => {
    return new GetSiteResponse(
      Resources.Site.fromObject(obj.site),
    );
  }
}

export class GetSiteBySlugRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class GetSiteBySlugResponse extends ResponseData {
  readonly site: Resources.Site;

  public constructor(site: Resources.Site) {
    super();
    this.site = site;
  }

  public static fromObject = (obj: Record<string, any>): GetSiteBySlugResponse => {
    return new GetSiteBySlugResponse(
      Resources.Site.fromObject(obj.site),
    );
  }
}

export class ListSiteVersionsRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class ListSiteVersionsResponse extends ResponseData {
  readonly siteVersions: Resources.SiteVersion[];

  public constructor(siteVersions: Resources.SiteVersion[]) {
    super();
    this.siteVersions = siteVersions;
  }

  public static fromObject = (obj: Record<string, any>): ListSiteVersionsResponse => {
    return new ListSiteVersionsResponse(
      obj.siteVersions.map((siteVersion: Record<string, any>): Resources.SiteVersion => Resources.SiteVersion.fromObject(siteVersion)),
    );
  }
}

export class GetSitePrimaryVersionRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class GetSitePrimaryVersionResponse extends ResponseData {
  readonly siteVersion: Resources.SiteVersion;

  public constructor(siteVersion: Resources.SiteVersion) {
    super();
    this.siteVersion = siteVersion;
  }

  public static fromObject = (obj: Record<string, any>): GetSitePrimaryVersionResponse => {
    return new GetSitePrimaryVersionResponse(
      Resources.SiteVersion.fromObject(obj.siteVersion),
    );
  }
}


export class GetSiteVersionRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class GetSiteVersionResponse extends ResponseData {
  readonly siteVersion: Resources.SiteVersion;

  public constructor(siteVersion: Resources.SiteVersion) {
    super();
    this.siteVersion = siteVersion;
  }

  public static fromObject = (obj: Record<string, any>): GetSiteVersionResponse => {
    return new GetSiteVersionResponse(
      Resources.SiteVersion.fromObject(obj.siteVersion),
    );
  }
}


export class GetSiteVersionEntryRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class GetSiteVersionEntryResponse extends ResponseData {
  readonly siteVersionEntry: Resources.SiteVersionEntry;

  public constructor(siteVersionEntry: Resources.SiteVersionEntry) {
    super();
    this.siteVersionEntry = siteVersionEntry;
  }

  public static fromObject = (obj: Record<string, any>): GetSiteVersionEntryResponse => {
    return new GetSiteVersionEntryResponse(
      Resources.SiteVersionEntry.fromObject(obj.siteVersionEntry),
    );
  }
}

export class UpdateSiteVersionEntryRequest extends RequestData {
  readonly siteContent: Record<string, any> | null;
  readonly siteTheme: Record<string, any> | null;

  public constructor(siteContent: Record<string, any> | null, siteTheme: Record<string, any> | null) {
    super();
    this.siteContent = siteContent;
    this.siteTheme = siteTheme;
  }

  public toObject = (): Record<string, any> => {
    return {
      siteContent: this.siteContent,
      siteTheme: this.siteTheme,
    };
  }
}

export class UpdateSiteVersionEntryResponse extends ResponseData {
  readonly siteVersionEntry: Resources.SiteVersionEntry;

  public constructor(siteVersionEntry: Resources.SiteVersionEntry) {
    super();
    this.siteVersionEntry = siteVersionEntry;
  }

  public static fromObject = (obj: Record<string, any>): UpdateSiteVersionEntryResponse => {
    return new UpdateSiteVersionEntryResponse(
      Resources.SiteVersionEntry.fromObject(obj.siteVersionEntry),
    );
  }
}

export class ListTemplateCategoriesRequest extends RequestData {
  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class ListTemplateCategoriesResponse extends ResponseData {
  readonly templateCategories: Resources.TemplateCategory[];

  public constructor(templateCategories: Resources.TemplateCategory[]) {
    super();
    this.templateCategories = templateCategories;
  }

  public static fromObject = (obj: Record<string, any>): ListTemplateCategoriesResponse => {
    return new ListTemplateCategoriesResponse(
      obj.templateCategories.map((templateCategory: Record<string, any>): Resources.TemplateCategory => Resources.TemplateCategory.fromObject(templateCategory)),
    );
  }
}

export class CreateTemplateCategoryRequest extends RequestData {
  readonly name: string;

  public constructor(name: string) {
    super();
    this.name = name;
  }

  public toObject = (): Record<string, any> => {
    return {
      name: this.name,
    };
  }
}

export class CreateTemplateCategoryResponse extends ResponseData {
  readonly templateCategory: Resources.TemplateCategory;

  public constructor(templateCategory: Resources.TemplateCategory) {
    super();
    this.templateCategory = templateCategory;
  }

  public static fromObject = (obj: Record<string, any>): CreateTemplateCategoryResponse => {
    return new CreateTemplateCategoryResponse(
      Resources.TemplateCategory.fromObject(obj.templateCategory),
    );
  }
}

export class GetTemplateCategoryRequest extends RequestData {
  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class GetTemplateCategoryResponse extends ResponseData {
  readonly templateCategory: Resources.TemplateCategory;

  public constructor(templateCategory: Resources.TemplateCategory) {
    super();
    this.templateCategory = templateCategory;
  }

  public static fromObject = (obj: Record<string, any>): GetTemplateCategoryResponse => {
    return new GetTemplateCategoryResponse(
      Resources.TemplateCategory.fromObject(obj.templateCategory),
    );
  }
}

export class ListTemplatesRequest extends RequestData {
  readonly templateCategoryId: number;

  public constructor(templateCategoryId: number) {
    super();
    this.templateCategoryId = templateCategoryId;
  }

  public toObject = (): Record<string, any> => {
    return {
      templateCategoryId: this.templateCategoryId,
    };
  }
}

export class ListTemplatesResponse extends ResponseData {
  readonly templates: Resources.Template[];

  public constructor(templates: Resources.Template[]) {
    super();
    this.templates = templates;
  }

  public static fromObject = (obj: Record<string, any>): ListTemplatesResponse => {
    return new ListTemplatesResponse(
      obj.templates.map((template: Record<string, any>): Resources.Template => Resources.Template.fromObject(template)),
    );
  }
}

export class CreateTemplateRequest extends RequestData {
  readonly name: string;
  readonly description: string;
  readonly siteId: number;
  readonly templateCategoryId: number;

  public constructor(name: string, description: string, siteId: number, templateCategoryId: number) {
    super();
    this.name = name;
    this.description = description;
    this.siteId = siteId;
    this.templateCategoryId = templateCategoryId;
  }

  public toObject = (): Record<string, any> => {
    return {
      name: this.name,
      description: this.description,
      siteId: this.siteId,
      templateCategoryId: this.templateCategoryId,
    };
  }
}

export class CreateTemplateResponse extends ResponseData {
  readonly template: Resources.Template;

  public constructor(template: Resources.Template) {
    super();
    this.template = template;
  }

  public static fromObject = (obj: Record<string, any>): CreateTemplateResponse => {
    return new CreateTemplateResponse(
      Resources.Template.fromObject(obj.template),
    );
  }
}

export class GetTemplateRequest extends RequestData {
  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class GetTemplateResponse extends ResponseData {
  readonly template: Resources.Template;

  public constructor(template: Resources.Template) {
    super();
    this.template = template;
  }

  public static fromObject = (obj: Record<string, any>): GetTemplateResponse => {
    return new GetTemplateResponse(
      Resources.Template.fromObject(obj.template),
    );
  }
}

export class GetSiteVersionEntryForTemplateRequest extends RequestData {
  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class GetSiteVersionEntryForTemplateResponse extends ResponseData {
  readonly siteVersionEntry: Resources.SiteVersionEntry;

  public constructor(siteVersionEntry: Resources.SiteVersionEntry) {
    super();
    this.siteVersionEntry = siteVersionEntry;
  }

  public static fromObject = (obj: Record<string, any>): GetSiteVersionEntryForTemplateResponse => {
    return new GetSiteVersionEntryForTemplateResponse(
      Resources.SiteVersionEntry.fromObject(obj.siteVersionEntry),
    );
  }
}

export class ListSectionCategoriesRequest extends RequestData {
  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class ListSectionCategoriesResponse extends ResponseData {
  readonly sectionCategories: Resources.SectionCategory[];

  public constructor(sectionCategories: Resources.SectionCategory[]) {
    super();
    this.sectionCategories = sectionCategories;
  }

  public static fromObject = (obj: Record<string, any>): ListSectionCategoriesResponse => {
    return new ListSectionCategoriesResponse(
      obj.sectionCategories.map((sectionCategory: Record<string, any>): Resources.SectionCategory => Resources.SectionCategory.fromObject(sectionCategory)),
    );
  }
}

export class CreateSectionCategoryRequest extends RequestData {
  readonly name: string;

  public constructor(name: string) {
    super();
    this.name = name;
  }

  public toObject = (): Record<string, any> => {
    return {
      name: this.name,
    };
  }
}

export class CreateSectionCategoryResponse extends ResponseData {
  readonly sectionCategory: Resources.SectionCategory;

  public constructor(sectionCategory: Resources.SectionCategory) {
    super();
    this.sectionCategory = sectionCategory;
  }

  public static fromObject = (obj: Record<string, any>): CreateSectionCategoryResponse => {
    return new CreateSectionCategoryResponse(
      Resources.SectionCategory.fromObject(obj.sectionCategory),
    );
  }
}

export class GetSectionCategoryRequest extends RequestData {
  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class GetSectionCategoryResponse extends ResponseData {
  readonly sectionCategory: Resources.SectionCategory;

  public constructor(sectionCategory: Resources.SectionCategory) {
    super();
    this.sectionCategory = sectionCategory;
  }

  public static fromObject = (obj: Record<string, any>): GetSectionCategoryResponse => {
    return new GetSectionCategoryResponse(
      Resources.SectionCategory.fromObject(obj.sectionCategory),
    );
  }
}

export class ListSectionsRequest extends RequestData {
  readonly sectionCategoryId: number;

  public constructor(sectionCategoryId: number) {
    super();
    this.sectionCategoryId = sectionCategoryId;
  }

  public toObject = (): Record<string, any> => {
    return {
      sectionCategoryId: this.sectionCategoryId,
    };
  }
}

export class ListSectionsResponse extends ResponseData {
  readonly sections: Resources.Section[];

  public constructor(sections: Resources.Section[]) {
    super();
    this.sections = sections;
  }

  public static fromObject = (obj: Record<string, any>): ListSectionsResponse => {
    return new ListSectionsResponse(
      obj.sections.map((section: Record<string, any>): Resources.Section => Resources.Section.fromObject(section)),
    );
  }
}

export class CreateSectionRequest extends RequestData {
  readonly name: string;
  readonly description: string;
  readonly sectionType: string;
  readonly sectionCategoryId: number;
  readonly previewImageUrl: string;
  readonly content: Record<string, any>;

  public constructor(name: string, description: string, sectionType: string, sectionCategoryId: number, previewImageUrl: string, content: Record<string, any>) {
    super();
    this.name = name;
    this.description = description;
    this.sectionType = sectionType;
    this.sectionCategoryId = sectionCategoryId;
    this.previewImageUrl = previewImageUrl;
    this.content = content;
  }

  public toObject = (): Record<string, any> => {
    return {
      name: this.name,
      description: this.description,
      sectionType: this.sectionType,
      sectionCategoryId: this.sectionCategoryId,
      previewImageUrl: this.previewImageUrl,
      content: this.content,
    };
  }
}

export class CreateSectionResponse extends ResponseData {
  readonly section: Resources.Section;

  public constructor(section: Resources.Section) {
    super();
    this.section = section;
  }

  public static fromObject = (obj: Record<string, any>): CreateSectionResponse => {
    return new CreateSectionResponse(
      Resources.Section.fromObject(obj.section),
    );
  }
}

export class GetSectionRequest extends RequestData {
  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class GetSectionResponse extends ResponseData {
  readonly section: Resources.Section;

  public constructor(section: Resources.Section) {
    super();
    this.section = section;
  }

  public static fromObject = (obj: Record<string, any>): GetSectionResponse => {
    return new GetSectionResponse(
      Resources.Section.fromObject(obj.section),
    );
  }
}

export class GetIosAppRequest extends RequestData {
  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class GetIosAppResponse extends ResponseData {
  readonly iosApp: Resources.IosApp;

  public constructor(iosApp: Resources.IosApp) {
    super();
    this.iosApp = iosApp;
  }

  public static fromObject = (obj: Record<string, any>): GetIosAppResponse => {
    return new GetIosAppResponse(
      Resources.IosApp.fromObject(obj.iosApp),
    );
  }
}

export class GetAndroidAppRequest extends RequestData {
  public toObject = (): Record<string, any> => {
    return {
    };
  }
}

export class GetAndroidAppResponse extends ResponseData {
  readonly iosApp: Resources.AndroidApp;

  public constructor(iosApp: Resources.AndroidApp) {
    super();
    this.iosApp = iosApp;
  }

  public static fromObject = (obj: Record<string, any>): GetAndroidAppResponse => {
    return new GetAndroidAppResponse(
      Resources.AndroidApp.fromObject(obj.iosApp),
    );
  }
}
