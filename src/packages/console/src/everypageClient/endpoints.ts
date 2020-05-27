import { Site, SiteVersion, CreatedSiteVersion, SiteVersionEntry } from './resources';
import { RequestData, ResponseData } from '@kibalabs/core';

export class CreateSiteRequest extends RequestData {
  readonly accountId: number;
  readonly slug: string;
  readonly name?: string;

  public constructor(accountId: number, slug: string, name?: string) {
    super();
    this.accountId = accountId;
    this.slug = slug;
    this.name = name;
  }

  public toObject = (): Record<string, any> => {
    return {
      accountId: this.accountId,
      slug: this.slug,
      name: this.name,
    };
  }
}

export class CreateSiteResponse extends ResponseData {
  readonly site: Site;

  public constructor(site: Site) {
    super();
    this.site = site;
  }

  public static fromObject = (obj: Record<string, any>): CreateSiteResponse => {
    return new CreateSiteResponse(
      Site.fromObject(obj.site),
    );
  }
}

export class CreateSiteVersionRequest extends RequestData {
  readonly siteContent: Record<string, any>;
  readonly siteTheme: Record<string, any>;

  public constructor(siteContent: Record<string, any>, siteTheme: Record<string, any>) {
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

export class CreateSiteVersionResponse extends ResponseData {
  readonly createdSiteVersion: CreatedSiteVersion;

  public constructor(createdSiteVersion: CreatedSiteVersion) {
    super();
    this.createdSiteVersion = createdSiteVersion;
  }

  public static fromObject = (obj: Record<string, any>): CreateSiteVersionResponse => {
    return new CreateSiteVersionResponse(
      CreatedSiteVersion.fromObject(obj.createdSiteVersion),
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
  readonly site: Site;

  public constructor(site: Site) {
    super();
    this.site = site;
  }

  public static fromObject = (obj: Record<string, any>): GetSiteResponse => {
    return new GetSiteResponse(
      Site.fromObject(obj.site),
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
  readonly site: Site;

  public constructor(site: Site) {
    super();
    this.site = site;
  }

  public static fromObject = (obj: Record<string, any>): GetSiteBySlugResponse => {
    return new GetSiteBySlugResponse(
      Site.fromObject(obj.site),
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
  readonly siteVersions: [SiteVersion];

  public constructor(siteVersions: [SiteVersion]) {
    super();
    this.siteVersions = siteVersions;
  }

  public static fromObject = (obj: Record<string, any>): ListSiteVersionsResponse => {
    return new ListSiteVersionsResponse(
      obj.siteVersions.map((siteVersion: Record<string, any>): SiteVersion => SiteVersion.fromObject(siteVersion)),
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
  readonly siteVersion: SiteVersion;

  public constructor(siteVersion: SiteVersion) {
    super();
    this.siteVersion = siteVersion;
  }

  public static fromObject = (obj: Record<string, any>): GetSitePrimaryVersionResponse => {
    return new GetSitePrimaryVersionResponse(
      SiteVersion.fromObject(obj.siteVersion),
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
  readonly siteVersion: SiteVersion;

  public constructor(siteVersion: SiteVersion) {
    super();
    this.siteVersion = siteVersion;
  }

  public static fromObject = (obj: Record<string, any>): GetSiteVersionResponse => {
    return new GetSiteVersionResponse(
      SiteVersion.fromObject(obj.siteVersion),
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
  readonly siteVersionEntry: SiteVersionEntry;

  public constructor(siteVersionEntry: SiteVersionEntry) {
    super();
    this.siteVersionEntry = siteVersionEntry;
  }

  public static fromObject = (obj: Record<string, any>): GetSiteVersionEntryResponse => {
    return new GetSiteVersionEntryResponse(
      SiteVersionEntry.fromObject(obj.siteVersionEntry),
    );
  }
}
