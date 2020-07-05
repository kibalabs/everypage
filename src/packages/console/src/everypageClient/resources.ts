import { dateFromString } from '@kibalabs/core';

export class Account {
  readonly accountId: number;
  readonly accountType: string;
  readonly name: string;

  public constructor(accountId: number, accountType: string, name: string) {
    this.accountId = accountId;
    this.accountType = accountType;
    this.name = name;
  }

  public static fromObject = (obj: Record<string, any>): Account => {
    return new Account(
      Number(obj.accountId),
      String(obj.accountType),
      String(obj.name),
    );
  }
}

export class StripeSubscription {
  readonly subscriptionId: string;
  readonly status: string;
  readonly latestInvoicePaymentStatus: string;
  readonly latestInvoicePaymentActionSecret: string;

  public constructor(subscriptionId: string, status: string, latestInvoicePaymentStatus: string, latestInvoicePaymentActionSecret: string) {
    this.subscriptionId = subscriptionId;
    this.status = status;
    this.latestInvoicePaymentStatus = latestInvoicePaymentStatus;
    this.latestInvoicePaymentActionSecret = latestInvoicePaymentActionSecret;
  }

  public static fromObject = (obj: Record<string, any>): StripeSubscription => {
    return new StripeSubscription(
      String(obj.subscriptionId),
      String(obj.status),
      String(obj.latestInvoicePaymentStatus),
      String(obj.latestInvoicePaymentActionSecret),
    );
  }
}

export class StripePortalSession {
  readonly portalSessionId: string;
  readonly url: string;

  public constructor(portalSessionId: string, url: string) {
    this.portalSessionId = portalSessionId;
    this.url = url;
  }

  public static fromObject = (obj: Record<string, any>): StripePortalSession => {
    return new StripePortalSession(
      String(obj.portalSessionId),
      String(obj.url),
    );
  }
}

export class Site {
  readonly siteId: number;
  readonly accountId: number;
  readonly slug: string;
  readonly name: string;
  readonly isPublishing: boolean;
  readonly customDomain: string | null;
  readonly customDomainStatus: string | null;

  public constructor(siteId: number, accountId: number, slug: string, name: string, isPublishing: boolean, customDomain: string | null, customDomainStatus: string | null) {
    this.siteId = siteId;
    this.accountId = accountId;
    this.slug = slug;
    this.name = name;
    this.isPublishing = isPublishing;
    this.customDomain = customDomain;
    this.customDomainStatus = customDomainStatus;
  }

  public static fromObject = (obj: Record<string, any>): Site => {
    return new Site(
      Number(obj.siteId),
      Number(obj.accountId),
      String(obj.slug),
      String(obj.name),
      Boolean(obj.isPublishing),
      obj.customDomain ? String(obj.customDomain) : null,
      obj.customDomainStatus ? String(obj.customDomainStatus) : null,
    );
  }
}

export class SiteVersion {
  readonly siteVersionId: number;
  readonly buildHash: string;
  readonly siteId: number;
  readonly name: string | null;
  readonly isPublishing: boolean;
  readonly publishDate: Date | null;
  readonly archiveDate: Date | null;
  readonly lastUpdateDate: Date;

  public constructor(siteVersionId: number, buildHash: string, siteId: number, name: string | null, isPublishing: boolean, publishDate: Date | null, archiveDate: Date | null, lastUpdateDate: Date) {
    this.siteVersionId = siteVersionId;
    this.buildHash = buildHash;
    this.siteId = siteId;
    this.name = name;
    this.isPublishing = isPublishing;
    this.publishDate = publishDate;
    this.archiveDate = archiveDate;
    this.lastUpdateDate = lastUpdateDate;
  }

  public static fromObject = (obj: Record<string, any>): SiteVersion => {
    return new SiteVersion(
      Number(obj.siteVersionId),
      String(obj.buildHash),
      Number(obj.siteId),
      obj.name ? String(obj.name) : null,
      Boolean(obj.isPublishing),
      obj.publishDate ? dateFromString(obj.publishDate) : null,
      obj.archiveDate ? dateFromString(obj.creationDate) : null,
      dateFromString(obj.lastUpdateDate),
    );
  }
}

export class SiteVersionEntry {
  readonly siteVersionEntryId: number;
  readonly siteVersionId: number;
  readonly siteContent: Record<string, any>;
  readonly siteTheme: Record<string, any>;

  public constructor(siteVersionEntryId: number, siteVersionId: number, siteContent: Record<string, any>, siteTheme: Record<string, any>) {
    this.siteVersionEntryId = siteVersionEntryId;
    this.siteVersionId = siteVersionId;
    this.siteContent = siteContent;
    this.siteTheme = siteTheme;
  }

  public static fromObject = (obj: Record<string, any>): SiteVersionEntry => {
    return new SiteVersionEntry(
      Number(obj.siteVersionEntryId),
      Number(obj.siteVersionId),
      obj.siteContent,
      obj.siteTheme,
    );
  }
}

export class PresignedUpload {
  readonly url: string;
  readonly params: Record<string, string>;

  public constructor(url: string, params: Record<string, string>) {
    this.url = url;
    this.params = params;
  }

  public static fromObject = (obj: Record<string, any>): PresignedUpload => {
    return new PresignedUpload(
      String(obj.url),
      obj.params,
    );
  }
}

export class AssetFile {
  readonly path: string;

  public constructor(path: string) {
    this.path = path;
  }

  public static fromObject = (obj: Record<string, any>): AssetFile => {
    return new AssetFile(
      String(obj.path),
    );
  }
}

export class TemplateCategory {
  readonly templateCategoryId: number;
  readonly name: string;

  public constructor(templateCategoryId: number, name: string) {
    this.templateCategoryId = templateCategoryId;
    this.name = name;
  }

  public static fromObject = (obj: Record<string, any>): TemplateCategory => {
    return new TemplateCategory(
      Number(obj.templateCategoryId),
      String(obj.name),
    );
  }
}

export class Template {
  readonly templateId: number;
  readonly name: string;
  readonly description: string;
  readonly siteId: number;
  readonly templateCategoryId: number;
  readonly imageUrl: string;
  readonly previewUrl: string;

  public constructor(templateId: number, name: string, description: string, siteId: number, templateCategoryId: number, imageUrl: string, previewUrl: string) {
    this.templateId = templateId;
    this.name = name;
    this.description = description;
    this.siteId = siteId;
    this.templateCategoryId = templateCategoryId;
    this.imageUrl = imageUrl;
    this.previewUrl = previewUrl;
  }

  public static fromObject = (obj: Record<string, any>): Template => {
    return new Template(
      Number(obj.templateId),
      String(obj.name),
      String(obj.description),
      Number(obj.siteId),
      Number(obj.templateCategoryId),
      String(obj.imageUrl),
      String(obj.previewUrl),
    );
  }
}


export class IosApp {
  readonly iosAppId: string;
  readonly name: string;
  readonly description: string;
  readonly publisherName: string;
  readonly iconImageUrl: string;
  readonly storeUrl: string;

  public constructor(iosAppId: string, name: string, description: string, publisherName: string, iconImageUrl: string, storeUrl: string) {
    this.iosAppId = iosAppId;
    this.name = name;
    this.description = description;
    this.publisherName = publisherName;
    this.iconImageUrl = iconImageUrl;
    this.storeUrl = storeUrl;
  }

  public static fromObject = (obj: Record<string, any>): IosApp => {
    return new IosApp(
      String(obj.iosAppId),
      String(obj.name),
      String(obj.description),
      String(obj.publisherName),
      String(obj.iconImageUrl),
      String(obj.storeUrl),
    );
  }
}

export class AndroidApp {
  readonly androidAppId: string;
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly publisherName: string;
  readonly iconImageUrl: string;
  readonly storeUrl: string;

  public constructor(androidAppId: string, name: string, tagline: string, description: string, publisherName: string, iconImageUrl: string, storeUrl: string) {
    this.androidAppId = androidAppId;
    this.name = name;
    this.tagline = tagline;
    this.description = description;
    this.publisherName = publisherName;
    this.iconImageUrl = iconImageUrl;
    this.storeUrl = storeUrl;
  }

  public static fromObject = (obj: Record<string, any>): AndroidApp => {
    return new AndroidApp(
      String(obj.androidAppId),
      String(obj.name),
      String(obj.tagline),
      String(obj.description),
      String(obj.publisherName),
      String(obj.iconImageUrl),
      String(obj.storeUrl),
    );
  }
}
