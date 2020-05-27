import { dateFromString } from '@kibalabs/core';

export class Site {
  readonly siteId: number;
  readonly accountId: number;
  readonly slug: string;
  readonly name: string;
  readonly customDomain: string | null;

  public constructor(siteId: number, accountId: number, slug: string, name: string, customDomain: string | null) {
    this.siteId = siteId;
    this.accountId = accountId;
    this.slug = slug;
    this.name = name;
    this.customDomain = customDomain;
  }

  public static fromObject = (obj: Record<string, any>): Site => {
    return new Site(
      Number(obj.siteId),
      Number(obj.accountId),
      String(obj.slug),
      String(obj.name),
      obj.customDomain ? String(obj.customDomain) : null,
    );
  }
}

export class SiteVersion {
  readonly siteVersionId: number;
  readonly creationDate: Date;
  readonly buildHash: string;
  readonly siteId: number;
  readonly name: string | null;
  readonly isPublished: boolean;
  readonly isArchived: boolean;

  public constructor(siteVersionId: number, creationDate: Date, buildHash: string, siteId: number, name: string | null, isPublished: boolean, isArchived: boolean) {
    this.siteVersionId = siteVersionId;
    this.creationDate = creationDate;
    this.buildHash = buildHash;
    this.siteId = siteId;
    this.name = name;
    this.isPublished = isPublished;
    this.isArchived = isArchived;
  }

  public static fromObject = (obj: Record<string, any>): SiteVersion => {
    return new SiteVersion(
      Number(obj.siteVersionId),
      dateFromString(obj.creationDate),
      String(obj.buildHash),
      Number(obj.siteId),
      obj.name ? String(obj.name) : null,
      Boolean(obj.isPublished),
      Boolean(obj.isArchived),
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
