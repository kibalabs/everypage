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
  public constructor() {
    super();
  }

  public toObject = (): Record<string, any> => {
    return {
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
