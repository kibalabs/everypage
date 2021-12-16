/* eslint-disable no-useless-constructor, unused-imports/no-unused-vars */
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

  public toObject = (): Record<string, unknown> => {
    return {
      email: this.email,
      password: this.password,
    };
  }
}

export class LoginUserResponse extends ResponseData {
  public static fromObject = (obj: Record<string, unknown>): LoginUserResponse => {
    return new LoginUserResponse();
  }
}

export class LogoutUserRequest extends RequestData {
  public toObject = (): Record<string, unknown> => {
    return {
    };
  }
}

export class LogoutUserResponse extends ResponseData {
  public static fromObject = (obj: Record<string, unknown>): LogoutUserResponse => {
    return new LogoutUserResponse();
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

  public toObject = (): Record<string, unknown> => {
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
  public static fromObject = (obj: Record<string, unknown>): CreateUserResponse => {
    return new CreateUserResponse();
  }
}

export class RefreshTokenRequest extends RequestData {
  public toObject = (): Record<string, unknown> => {
    return {
    };
  }
}

export class RefreshTokenResponse extends ResponseData {
  public static fromObject = (obj: Record<string, unknown>): RefreshTokenResponse => {
    return new RefreshTokenResponse();
  }
}

export class SendEmailVerificationForUserRequest extends RequestData {
  public toObject = (): Record<string, unknown> => {
    return {
    };
  }
}

export class SendEmailVerificationForUserResponse extends ResponseData {
  public static fromObject = (obj: Record<string, unknown>): SendEmailVerificationForUserResponse => {
    return new SendEmailVerificationForUserResponse();
  }
}

export class RetrieveAccountsRequest extends RequestData {
  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): RetrieveAccountsResponse => {
    return new RetrieveAccountsResponse(
      (obj.accounts as Record<string, unknown>[]).map((account: Record<string, unknown>): Resources.Account => Resources.Account.fromObject(account)),
    );
  }
}

export class GetAccountRequest extends RequestData {
  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): GetAccountResponse => {
    return new GetAccountResponse(
      Resources.Account.fromObject(obj.account as Record<string, unknown>),
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

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): CreateSubscriptionForAccountResponse => {
    return new CreateSubscriptionForAccountResponse(
      Resources.StripeSubscription.fromObject(obj.stripeSubscription as Record<string, unknown>),
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

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): ChangeSubscriptionForAccountResponse => {
    return new ChangeSubscriptionForAccountResponse(
      Resources.StripeSubscription.fromObject(obj.stripeSubscription as Record<string, unknown>),
    );
  }
}
export class CreatePortalSessionForAccountRequest extends RequestData {
  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): CreatePortalSessionForAccountResponse => {
    return new CreatePortalSessionForAccountResponse(
      Resources.StripePortalSession.fromObject(obj.stripePortalSession as Record<string, unknown>),
    );
  }
}


export class RetrieveSitesForAccountRequest extends RequestData {
  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): RetrieveSitesForAccountResponse => {
    return new RetrieveSitesForAccountResponse(
      (obj.sites as Record<string, unknown>[]).map((site: Record<string, unknown>): Resources.Site => Resources.Site.fromObject(site as Record<string, unknown>)),
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

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): CreateSiteResponse => {
    return new CreateSiteResponse(
      Resources.Site.fromObject(obj.site as Record<string, unknown>),
    );
  }
}

export class CreateSiteVersionRequest extends RequestData {
  readonly siteContent?: Record<string, unknown>;
  readonly siteTheme?: Record<string, unknown>;
  readonly name?: string;
  readonly templateId?: number;

  public constructor(siteContent?: Record<string, unknown>, siteTheme?: Record<string, unknown>, name?: string, templateId?: number) {
    super();
    this.siteContent = siteContent;
    this.siteTheme = siteTheme;
    this.name = name;
    this.templateId = templateId;
  }

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): CreateSiteVersionResponse => {
    return new CreateSiteVersionResponse(
      Resources.SiteVersion.fromObject(obj.siteVersion as Record<string, unknown>),
    );
  }
}

export class RetrieveNextVersionNameRequest extends RequestData {
  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): RetrieveNextVersionNameResponse => {
    return new RetrieveNextVersionNameResponse(
      String(obj.nextVersionName),
    );
  }
}

export class ListSiteVersionAssetsRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): ListSiteVersionAssetsResponse => {
    return new ListSiteVersionAssetsResponse(
      (obj.assetFiles as Record<string, unknown>[]).map((siteVersion: Record<string, unknown>): Resources.AssetFile => Resources.AssetFile.fromObject(siteVersion)),
    );
  }
}

export class DeleteSiteVersionAssetsRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, unknown> => {
    return {
    };
  }
}

export class DeleteSiteVersionAssetsResponse extends ResponseData {
  public constructor() {
    super();
  }

  public static fromObject = (obj: Record<string, unknown>): DeleteSiteVersionAssetsResponse => {
    return new DeleteSiteVersionAssetsResponse();
  }
}


export class PromoteSiteVersionRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, unknown> => {
    return {
    };
  }
}

export class PromoteSiteVersionResponse extends ResponseData {
  public constructor() {
    super();
  }

  public static fromObject = (obj: Record<string, unknown>): PromoteSiteVersionResponse => {
    return new PromoteSiteVersionResponse();
  }
}

export class CloneSiteVersionRequest extends RequestData {
  readonly name?: string;

  public constructor(name?: string) {
    super();
    this.name = name;
  }

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): CloneSiteVersionResponse => {
    return new CloneSiteVersionResponse(
      Resources.SiteVersion.fromObject(obj.siteVersion as Record<string, unknown>),
    );
  }
}

export class ArchiveSiteVersionRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, unknown> => {
    return {
    };
  }
}

export class ArchiveSiteVersionResponse extends ResponseData {
  readonly siteVersion: Resources.SiteVersion;

  public constructor(siteVersion: Resources.SiteVersion) {
    super();
    this.siteVersion = siteVersion;
  }

  public static fromObject = (obj: Record<string, unknown>): ArchiveSiteVersionResponse => {
    return new ArchiveSiteVersionResponse(
      Resources.SiteVersion.fromObject(obj.siteVersion as Record<string, unknown>),
    );
  }
}

export class GenerateAssetUploadForSiteVersionRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): GenerateAssetUploadForSiteVersionResponse => {
    return new GenerateAssetUploadForSiteVersionResponse(
      Resources.PresignedUpload.fromObject(obj.presignedUpload as Record<string, unknown>),
    );
  }
}


export class GetSiteRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): GetSiteResponse => {
    return new GetSiteResponse(
      Resources.Site.fromObject(obj.site as Record<string, unknown>),
    );
  }
}

export class UpdateDomainForSiteRequest extends RequestData {
  readonly customDomain: string;

  public constructor(customDomain: string) {
    super();
    this.customDomain = customDomain;
  }

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): UpdateDomainForSiteResponse => {
    return new UpdateDomainForSiteResponse(
      Resources.Site.fromObject(obj.site as Record<string, unknown>),
    );
  }
}

export class ArchiveSiteRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, unknown> => {
    return {
    };
  }
}

export class ArchiveSiteResponse extends ResponseData {
  readonly site: Resources.Site;

  public constructor(site: Resources.Site) {
    super();
    this.site = site;
  }

  public static fromObject = (obj: Record<string, unknown>): ArchiveSiteResponse => {
    return new GetSiteResponse(
      Resources.Site.fromObject(obj.site as Record<string, unknown>),
    );
  }
}

export class GetSiteBySlugRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): GetSiteBySlugResponse => {
    return new GetSiteBySlugResponse(
      Resources.Site.fromObject(obj.site as Record<string, unknown>),
    );
  }
}

export class ListSiteVersionsRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): ListSiteVersionsResponse => {
    return new ListSiteVersionsResponse(
      (obj.siteVersions as Record<string, unknown>[]).map((siteVersion: Record<string, unknown>): Resources.SiteVersion => Resources.SiteVersion.fromObject(siteVersion)),
    );
  }
}

export class GetSitePrimaryVersionRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): GetSitePrimaryVersionResponse => {
    return new GetSitePrimaryVersionResponse(
      Resources.SiteVersion.fromObject(obj.siteVersion as Record<string, unknown>),
    );
  }
}


export class GetSiteVersionRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): GetSiteVersionResponse => {
    return new GetSiteVersionResponse(
      Resources.SiteVersion.fromObject(obj.siteVersion as Record<string, unknown>),
    );
  }
}


export class GetSiteVersionEntryRequest extends RequestData {
  public constructor() {
    super();
  }

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): GetSiteVersionEntryResponse => {
    return new GetSiteVersionEntryResponse(
      Resources.SiteVersionEntry.fromObject(obj.siteVersionEntry as Record<string, unknown>),
    );
  }
}

export class UpdateSiteVersionEntryRequest extends RequestData {
  readonly siteContent: Record<string, unknown> | null;
  readonly siteTheme: Record<string, unknown> | null;

  public constructor(siteContent: Record<string, unknown> | null, siteTheme: Record<string, unknown> | null) {
    super();
    this.siteContent = siteContent;
    this.siteTheme = siteTheme;
  }

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): UpdateSiteVersionEntryResponse => {
    return new UpdateSiteVersionEntryResponse(
      Resources.SiteVersionEntry.fromObject(obj.siteVersionEntry as Record<string, unknown>),
    );
  }
}

export class ListTemplateCategoriesRequest extends RequestData {
  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): ListTemplateCategoriesResponse => {
    return new ListTemplateCategoriesResponse(
      (obj.templateCategories as Record<string, unknown>[]).map((templateCategory: Record<string, unknown>): Resources.TemplateCategory => Resources.TemplateCategory.fromObject(templateCategory)),
    );
  }
}

export class CreateTemplateCategoryRequest extends RequestData {
  readonly name: string;

  public constructor(name: string) {
    super();
    this.name = name;
  }

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): CreateTemplateCategoryResponse => {
    return new CreateTemplateCategoryResponse(
      Resources.TemplateCategory.fromObject(obj.templateCategory as Record<string, unknown>),
    );
  }
}

export class GetTemplateCategoryRequest extends RequestData {
  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): GetTemplateCategoryResponse => {
    return new GetTemplateCategoryResponse(
      Resources.TemplateCategory.fromObject(obj.templateCategory as Record<string, unknown>),
    );
  }
}

export class ListTemplatesRequest extends RequestData {
  readonly templateCategoryId?: number;

  public constructor(templateCategoryId?: number) {
    super();
    this.templateCategoryId = templateCategoryId;
  }

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): ListTemplatesResponse => {
    return new ListTemplatesResponse(
      (obj.templates as Record<string, unknown>[]).map((template: Record<string, unknown>): Resources.Template => Resources.Template.fromObject(template)),
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

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): CreateTemplateResponse => {
    return new CreateTemplateResponse(
      Resources.Template.fromObject(obj.template as Record<string, unknown>),
    );
  }
}

export class GetTemplateRequest extends RequestData {
  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): GetTemplateResponse => {
    return new GetTemplateResponse(
      Resources.Template.fromObject(obj.template as Record<string, unknown>),
    );
  }
}

export class GetSiteVersionEntryForTemplateRequest extends RequestData {
  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): GetSiteVersionEntryForTemplateResponse => {
    return new GetSiteVersionEntryForTemplateResponse(
      Resources.SiteVersionEntry.fromObject(obj.siteVersionEntry as Record<string, unknown>),
    );
  }
}

export class ListSectionCategoriesRequest extends RequestData {
  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): ListSectionCategoriesResponse => {
    return new ListSectionCategoriesResponse(
      (obj.sectionCategories as Record<string, unknown>[]).map((sectionCategory: Record<string, unknown>): Resources.SectionCategory => Resources.SectionCategory.fromObject(sectionCategory)),
    );
  }
}

export class CreateSectionCategoryRequest extends RequestData {
  readonly name: string;

  public constructor(name: string) {
    super();
    this.name = name;
  }

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): CreateSectionCategoryResponse => {
    return new CreateSectionCategoryResponse(
      Resources.SectionCategory.fromObject(obj.sectionCategory as Record<string, unknown>),
    );
  }
}

export class GetSectionCategoryRequest extends RequestData {
  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): GetSectionCategoryResponse => {
    return new GetSectionCategoryResponse(
      Resources.SectionCategory.fromObject(obj.sectionCategory as Record<string, unknown>),
    );
  }
}

export class ListSectionsRequest extends RequestData {
  readonly sectionCategoryId?: number;

  public constructor(sectionCategoryId?: number) {
    super();
    this.sectionCategoryId = sectionCategoryId;
  }

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): ListSectionsResponse => {
    return new ListSectionsResponse(
      (obj.sections as Record<string, unknown>[]).map((section: Record<string, unknown>): Resources.Section => Resources.Section.fromObject(section)),
    );
  }
}

export class CreateSectionRequest extends RequestData {
  readonly name: string;
  readonly description: string;
  readonly sectionType: string;
  readonly sectionCategoryId: number;
  readonly previewImageUrl: string;
  readonly content: Record<string, unknown>;

  public constructor(name: string, description: string, sectionType: string, sectionCategoryId: number, previewImageUrl: string, content: Record<string, unknown>) {
    super();
    this.name = name;
    this.description = description;
    this.sectionType = sectionType;
    this.sectionCategoryId = sectionCategoryId;
    this.previewImageUrl = previewImageUrl;
    this.content = content;
  }

  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): CreateSectionResponse => {
    return new CreateSectionResponse(
      Resources.Section.fromObject(obj.section as Record<string, unknown>),
    );
  }
}

export class GetSectionRequest extends RequestData {
  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): GetSectionResponse => {
    return new GetSectionResponse(
      Resources.Section.fromObject(obj.section as Record<string, unknown>),
    );
  }
}

export class GetIosAppRequest extends RequestData {
  public toObject = (): Record<string, unknown> => {
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

  public static fromObject = (obj: Record<string, unknown>): GetIosAppResponse => {
    return new GetIosAppResponse(
      Resources.IosApp.fromObject(obj.iosApp as Record<string, unknown>),
    );
  }
}

export class GetAndroidAppRequest extends RequestData {
  public toObject = (): Record<string, unknown> => {
    return {
    };
  }
}

export class GetAndroidAppResponse extends ResponseData {
  readonly androidApp: Resources.AndroidApp;

  public constructor(androidApp: Resources.AndroidApp) {
    super();
    this.androidApp = androidApp;
  }

  public static fromObject = (obj: Record<string, unknown>): GetAndroidAppResponse => {
    return new GetAndroidAppResponse(
      Resources.AndroidApp.fromObject(obj.androidApp as Record<string, unknown>),
    );
  }
}
