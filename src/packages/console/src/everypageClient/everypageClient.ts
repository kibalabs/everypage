import { RestMethod, Requester, ServiceClient } from '@kibalabs/core';

import { Site, SiteVersion, SiteVersionEntry, CreatedSiteVersion } from './resources';
import { CreateSiteResponse, GetSiteResponse, GetSiteBySlugResponse, ListSiteVersionsResponse, GetSitePrimaryVersionResponse, CreateSiteVersionResponse, PromoteSiteVersionResponse, PromoteSiteVersionRequest, CreateSiteVersionRequest, GetSitePrimaryVersionRequest, ListSiteVersionsRequest, GetSiteBySlugRequest, GetSiteRequest, CreateSiteRequest, GetSiteVersionEntryRequest, GetSiteVersionEntryResponse, GetSiteVersionRequest, GetSiteVersionResponse } from './endpoints';


export class EverypageClient extends ServiceClient {

  public constructor(requester: Requester, baseUrl?: string) {
    super(requester, baseUrl || 'https://api.everypagehq.com')
  }

  public create_site = async (accountId: number, slug: string, name?: string): Promise<Site> => {
    const method = RestMethod.POST;
    const path = `v1/accounts/${accountId}/sites`;
    const request = new CreateSiteRequest(accountId, slug, name);
    const response = await this.makeRequest(method, path, request, CreateSiteResponse);
    return response.site;
  }

  public get_site = async (siteId: number): Promise<Site> => {
    const method = RestMethod.GET;
    const path = `v1/sites/${siteId}`;
    const request = new GetSiteRequest();
    const response = await this.makeRequest(method, path, request, GetSiteResponse);
    return response.site;
  }

  public get_site_by_slug = async (slug: string): Promise<Site> => {
    const method = RestMethod.GET;
    const path = `v1/sites/slug/${slug}`;
    const request = new GetSiteBySlugRequest();
    const response = await this.makeRequest(method, path, request, GetSiteBySlugResponse);
    return response.site;
  }

  public list_site_versions = async (siteId: number): Promise<SiteVersion[]> => {
    const method = RestMethod.GET;
    const path = `v1/sites/${siteId}/versions`;
    const request = new ListSiteVersionsRequest();
    const response = await this.makeRequest(method, path, request, ListSiteVersionsResponse);
    return response.siteVersions;
  }

  public get_site_primary_version = async (siteId: number): Promise<SiteVersion> => {
    const method = RestMethod.GET;
    const path = `v1/sites/${siteId}/primary-version`;
    const request = new GetSitePrimaryVersionRequest();
    const response = await this.makeRequest(method, path, request, GetSitePrimaryVersionResponse);
    return response.siteVersion;
  }

  public create_site_version = async (siteId: number, siteContent: Record<string, any>, siteTheme: Record<string, any>): Promise<CreatedSiteVersion> => {
    const method = RestMethod.POST;
    const path = `v1/sites/${siteId}/versions`;
    const request = new CreateSiteVersionRequest(siteContent, siteTheme);
    const response = await this.makeRequest(method, path, request, CreateSiteVersionResponse);
    return response.createdSiteVersion;
  }

  public promote_site_version = async (siteId: number, siteVersionId: number): Promise<void> => {
    const method = RestMethod.POST;
    const path = `v1/sites/${siteId}/versions/${siteVersionId}/promote`;
    const request = new PromoteSiteVersionRequest();
    await this.makeRequest(method, path, request, PromoteSiteVersionResponse);
  }

  public get_site_version = async (siteId: number, siteVersionId: number): Promise<SiteVersion> => {
    const method = RestMethod.GET;
    const path = `v1/sites/${siteId}/versions/${siteVersionId}`;
    const request = new GetSiteVersionRequest();
    const response = await this.makeRequest(method, path, request, GetSiteVersionResponse);
    return response.siteVersion;
  }

  public get_site_version_entry = async (siteId: number, siteVersionId: number): Promise<SiteVersionEntry> => {
    const method = RestMethod.GET;
    const path = `v1/sites/${siteId}/versions/${siteVersionId}/entry`;
    const request = new GetSiteVersionEntryRequest();
    const response = await this.makeRequest(method, path, request, GetSiteVersionEntryResponse);
    return response.siteVersionEntry;
  }
}
