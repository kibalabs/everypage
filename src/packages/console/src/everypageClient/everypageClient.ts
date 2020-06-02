import { RestMethod, Requester, ServiceClient } from '@kibalabs/core';

import * as Resources from './resources';
import * as Endpoints from './endpoints';


export class EverypageClient extends ServiceClient {

  public constructor(requester: Requester, baseUrl?: string) {
    super(requester, baseUrl || 'https://api.everypagehq.com')
  }

  public login_user = async (email: string, password: string): Promise<void> => {
    const method = RestMethod.POST;
    const path = `v1/users/login`;
    const request = new Endpoints.LoginUserRequest(email, password);
    await this.makeRequest(method, path, request, Endpoints.LoginUserResponse);
  }

  public logout_user = async (): Promise<void> => {
    const method = RestMethod.POST;
    const path = `v1/users/logout`;
    const request = new Endpoints.LogoutUserRequest();
    await this.makeRequest(method, path, request, Endpoints.LogoutUserResponse);
  }

  public create_user = async (firstName: string, lastName: string, email: string, password: string, shouldJoinNewsletter?: boolean): Promise<void> => {
    const method = RestMethod.POST;
    const path = `v1/users/create`;
    const request = new Endpoints.CreateUserRequest(firstName, lastName, email, password, shouldJoinNewsletter);
    await this.makeRequest(method, path, request, Endpoints.CreateUserResponse);
  }

  public create_site = async (accountId: number, slug: string, name?: string): Promise<Resources.Site> => {
    const method = RestMethod.POST;
    const path = `v1/accounts/${accountId}/sites`;
    const request = new Endpoints.CreateSiteRequest(accountId, slug, name);
    const response = await this.makeRequest(method, path, request, Endpoints.CreateSiteResponse);
    return response.site;
  }

  public get_site = async (siteId: number): Promise<Resources.Site> => {
    const method = RestMethod.GET;
    const path = `v1/sites/${siteId}`;
    const request = new Endpoints.GetSiteRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.GetSiteResponse);
    return response.site;
  }

  public get_site_by_slug = async (slug: string): Promise<Resources.Site> => {
    const method = RestMethod.GET;
    const path = `v1/sites/slug/${slug}`;
    const request = new Endpoints.GetSiteBySlugRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.GetSiteBySlugResponse);
    return response.site;
  }

  public list_site_versions = async (siteId: number): Promise<Resources.SiteVersion[]> => {
    const method = RestMethod.GET;
    const path = `v1/sites/${siteId}/versions`;
    const request = new Endpoints.ListSiteVersionsRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.ListSiteVersionsResponse);
    return response.siteVersions;
  }

  public get_site_primary_version = async (siteId: number): Promise<Resources.SiteVersion> => {
    const method = RestMethod.GET;
    const path = `v1/sites/${siteId}/primary-version`;
    const request = new Endpoints.GetSitePrimaryVersionRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.GetSitePrimaryVersionResponse);
    return response.siteVersion;
  }

  public create_site_version = async (siteId: number, siteContent: Record<string, any>, siteTheme: Record<string, any>): Promise<Resources.CreatedSiteVersion> => {
    const method = RestMethod.POST;
    const path = `v1/sites/${siteId}/versions`;
    const request = new Endpoints.CreateSiteVersionRequest(siteContent, siteTheme);
    const response = await this.makeRequest(method, path, request, Endpoints.CreateSiteVersionResponse);
    return response.createdSiteVersion;
  }

  public list_site_version_assets = async (siteId: number, siteVersionId: number): Promise<Resources.AssetFile[]> => {
    const method = RestMethod.GET;
    const path = `v1/sites/${siteId}/versions/${siteVersionId}/assets`;
    const request = new Endpoints.ListSiteVersionAssetsRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.ListSiteVersionAssetsResponse);
    return response.assetFiles;
  }

  public promote_site_version = async (siteId: number, siteVersionId: number): Promise<void> => {
    const method = RestMethod.POST;
    const path = `v1/sites/${siteId}/versions/${siteVersionId}/promote`;
    const request = new Endpoints.PromoteSiteVersionRequest();
    await this.makeRequest(method, path, request, Endpoints.PromoteSiteVersionResponse);
  }

  public clone_site_version = async (siteId: number, siteVersionId: number): Promise<Resources.SiteVersion> => {
    const method = RestMethod.POST;
    const path = `v1/sites/${siteId}/versions/${siteVersionId}/clone`;
    const request = new Endpoints.CloneSiteVersionRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.CloneSiteVersionResponse);
    return response.siteVersion;
  }

  public generate_asset_upload_for_site_version = async (siteId: number, siteVersionId: number): Promise<Resources.PresignedUpload> => {
    const method = RestMethod.POST;
    const path = `v1/sites/${siteId}/versions/${siteVersionId}/generate-asset-upload`;
    const request = new Endpoints.GenerateAssetUploadForSiteVersionRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.GenerateAssetUploadForSiteVersionResponse);
    return response.presignedUpload;
  }

  public get_site_version = async (siteId: number, siteVersionId: number): Promise<Resources.SiteVersion> => {
    const method = RestMethod.GET;
    const path = `v1/sites/${siteId}/versions/${siteVersionId}`;
    const request = new Endpoints.GetSiteVersionRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.GetSiteVersionResponse);
    return response.siteVersion;
  }

  public get_site_version_entry = async (siteId: number, siteVersionId: number): Promise<Resources.SiteVersionEntry> => {
    const method = RestMethod.GET;
    const path = `v1/sites/${siteId}/versions/${siteVersionId}/entry`;
    const request = new Endpoints.GetSiteVersionEntryRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.GetSiteVersionEntryResponse);
    return response.siteVersionEntry;
  }

  public update_site_version_entry = async (siteId: number, siteVersionId: number, siteContent: Record<string, any> | null, siteTheme: Record<string, any> | null): Promise<Resources.SiteVersionEntry> => {
    const method = RestMethod.PATCH;
    const path = `v1/sites/${siteId}/versions/${siteVersionId}/entry`;
    const request = new Endpoints.UpdateSiteVersionEntryRequest(siteContent, siteTheme);
    const response = await this.makeRequest(method, path, request, Endpoints.UpdateSiteVersionEntryResponse);
    return response.siteVersionEntry;
  }
}
