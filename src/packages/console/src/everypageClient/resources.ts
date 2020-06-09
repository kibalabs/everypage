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

export class Site {
  readonly siteId: number;
  readonly accountId: number;
  readonly slug: string;
  readonly name: string;
  readonly customDomain: string | null;
  readonly customDomainStatus: string | null;

  public constructor(siteId: number, accountId: number, slug: string, name: string, customDomain: string | null, customDomainStatus: string | null) {
    this.siteId = siteId;
    this.accountId = accountId;
    this.slug = slug;
    this.name = name;
    this.customDomain = customDomain;
    this.customDomainStatus = customDomainStatus;
  }

  public static fromObject = (obj: Record<string, any>): Site => {
    return new Site(
      Number(obj.siteId),
      Number(obj.accountId),
      String(obj.slug),
      String(obj.name),
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
  readonly publishDate: Date | null;
  readonly archiveDate: Date | null;
  readonly lastUpdateDate: Date;

  public constructor(siteVersionId: number, buildHash: string, siteId: number, name: string | null, publishDate: Date | null, archiveDate: Date | null, lastUpdateDate: Date) {
    this.siteVersionId = siteVersionId;
    this.buildHash = buildHash;
    this.siteId = siteId;
    this.name = name;
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
