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

  public constructor(siteVersionId: number, creationDate: Date, buildHash: string, siteId: number) {
    this.siteVersionId = siteVersionId;
    this.creationDate = creationDate;
    this.buildHash = buildHash;
    this.siteId = siteId;
  }

  public static fromObject = (obj: Record<string, any>): SiteVersion => {
    return new SiteVersion(
      Number(obj.siteVersionId),
      dateFromString(obj.creationDate),
      String(obj.buildHash),
      Number(obj.siteId),
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

export class CreatedSiteVersion {
  readonly siteVersion: SiteVersion;
  readonly presignedUpload: PresignedUpload;

  public constructor(siteVersion: SiteVersion, presignedUpload: PresignedUpload) {
    this.siteVersion = siteVersion;
    this.presignedUpload = presignedUpload;
  }

  public static fromObject = (obj: Record<string, any>): CreatedSiteVersion => {
    return new CreatedSiteVersion(
      SiteVersion.fromObject(obj.siteVersion),
      PresignedUpload.fromObject(obj.presignedUpload),
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
