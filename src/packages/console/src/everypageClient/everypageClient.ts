import { RestMethod, Requester, ServiceClient } from '@kibalabs/core';

import * as Resources from './resources';
import * as Endpoints from './endpoints';

export class EverypageClient extends ServiceClient {

  public constructor(requester: Requester, baseUrl?: string) {
    super(requester, baseUrl || 'https://api.everypagehq.com');
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

  public refresh_token = async (): Promise<void> => {
    const method = RestMethod.POST;
    const path = `v1/users/refresh-token`;
    const request = new Endpoints.RefreshTokenRequest();
    await this.makeRequest(method, path, request, Endpoints.RefreshTokenResponse);
  }

  public send_email_verification_for_user = async (): Promise<void> => {
    const method = RestMethod.POST;
    const path = `v1/users/send-email-verification`;
    const request = new Endpoints.SendEmailVerificationForUserRequest();
    await this.makeRequest(method, path, request, Endpoints.SendEmailVerificationForUserResponse);
  }

  public retrieve_accounts = async (): Promise<Resources.Account[]> => {
    const method = RestMethod.POST;
    const path = `v1/retrieve-accounts`;
    const request = new Endpoints.RetrieveAccountsRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.RetrieveAccountsResponse);
    return response.accounts;
  }

  public get_account = async (accountId: number): Promise<Resources.Account> => {
    const method = RestMethod.GET;
    const path = `v1/accounts/${accountId}`;
    const request = new Endpoints.GetAccountRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.GetAccountResponse);
    return response.account;
  }

  public create_subscription_for_account = async (accountId: number, planCode: string, priceCode: string, stripePaymentMethodId: string, couponCode?: string): Promise<Resources.StripeSubscription> => {
    const method = RestMethod.POST;
    const path = `v1/accounts/${accountId}/create-subscription`;
    const request = new Endpoints.CreateSubscriptionForAccountRequest(planCode, priceCode, stripePaymentMethodId, couponCode);
    const response = await this.makeRequest(method, path, request, Endpoints.CreateSubscriptionForAccountResponse);
    return response.stripeSubscription;
  }

  public change_subscription_for_account = async (accountId: number, planCode: string, priceCode: string, couponCode?: string): Promise<Resources.StripeSubscription> => {
    const method = RestMethod.POST;
    const path = `v1/accounts/${accountId}/change-subscription`;
    const request = new Endpoints.ChangeSubscriptionForAccountRequest(planCode, priceCode, couponCode);
    const response = await this.makeRequest(method, path, request, Endpoints.ChangeSubscriptionForAccountResponse);
    return response.stripeSubscription;
  }

  public create_portal_session_for_account = async (accountId: number): Promise<Resources.StripePortalSession> => {
    const method = RestMethod.POST;
    const path = `v1/accounts/${accountId}/create-portal-session`;
    const request = new Endpoints.CreatePortalSessionForAccountRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.CreatePortalSessionForAccountResponse);
    return response.stripePortalSession;
  }

  public retrieve_sites_for_account = async (accountId: number): Promise<Resources.Site[]> => {
    const method = RestMethod.POST;
    const path = `v1/accounts/${accountId}/retrieve-sites`;
    const request = new Endpoints.RetrieveSitesForAccountRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.RetrieveSitesForAccountResponse);
    return response.sites;
  }

  public create_site = async (accountId: number, slug: string, name?: string, templateId?: number): Promise<Resources.Site> => {
    const method = RestMethod.POST;
    const path = `v1/accounts/${accountId}/sites`;
    const request = new Endpoints.CreateSiteRequest(accountId, slug, name, templateId);
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

  public update_domain_for_site = async (siteId: number, customDomain: string): Promise<Resources.Site> => {
    const method = RestMethod.POST;
    const path = `v1/sites/${siteId}/update-domain`;
    const request = new Endpoints.UpdateDomainForSiteRequest(customDomain);
    const response = await this.makeRequest(method, path, request, Endpoints.UpdateDomainForSiteResponse);
    return response.site;
  }

  public archive_site = async (siteId: number): Promise<Resources.Site> => {
    const method = RestMethod.POST;
    const path = `v1/sites/${siteId}/archive`;
    const request = new Endpoints.ArchiveSiteRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.ArchiveSiteResponse);
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

  public create_site_version = async (siteId: number, siteContent?: Record<string, any>, siteTheme?: Record<string, any>, name?: string, templateId?: number): Promise<Resources.SiteVersion> => {
    const method = RestMethod.POST;
    const path = `v1/sites/${siteId}/versions`;
    const request = new Endpoints.CreateSiteVersionRequest(siteContent, siteTheme, name, templateId);
    const response = await this.makeRequest(method, path, request, Endpoints.CreateSiteVersionResponse);
    return response.siteVersion;
  }

  public retrieve_next_version_name = async (siteId: number): Promise<string> => {
    const method = RestMethod.POST;
    const path = `v1/sites/${siteId}/retrieve-next-version-name`;
    const request = new Endpoints.RetrieveNextVersionNameRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.RetrieveNextVersionNameResponse);
    return response.nextVersionName;
  }

  public generate_asset_upload_for_site_version = async (siteId: number, siteVersionId: number): Promise<Resources.PresignedUpload> => {
    const method = RestMethod.POST;
    const path = `v1/sites/${siteId}/versions/${siteVersionId}/generate-asset-upload`;
    const request = new Endpoints.GenerateAssetUploadForSiteVersionRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.GenerateAssetUploadForSiteVersionResponse);
    return response.presignedUpload;
  }

  public list_site_version_assets = async (siteId: number, siteVersionId: number): Promise<Resources.AssetFile[]> => {
    const method = RestMethod.GET;
    const path = `v1/sites/${siteId}/versions/${siteVersionId}/assets`;
    const request = new Endpoints.ListSiteVersionAssetsRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.ListSiteVersionAssetsResponse);
    return response.assetFiles;
  }

  public delete_site_version_asset = async (siteId: number, siteVersionId: number, assetPath: string): Promise<Void> => {
    const method = RestMethod.DELETE;
    const path = `v1/sites/${siteId}/versions/${siteVersionId}/assets/${encodeURIComponent(assetPath)}`;
    const request = new Endpoints.DeleteSiteVersionAssetsRequest();
    await this.makeRequest(method, path, request, Endpoints.DeleteSiteVersionAssetsResponse);
  }

  public promote_site_version = async (siteId: number, siteVersionId: number): Promise<void> => {
    const method = RestMethod.POST;
    const path = `v1/sites/${siteId}/versions/${siteVersionId}/promote-deferred`;
    const request = new Endpoints.PromoteSiteVersionRequest();
    await this.makeRequest(method, path, request, Endpoints.PromoteSiteVersionResponse);
  }

  public clone_site_version = async (siteId: number, siteVersionId: number, name?: string): Promise<Resources.SiteVersion> => {
    const method = RestMethod.POST;
    const path = `v1/sites/${siteId}/versions/${siteVersionId}/clone`;
    const request = new Endpoints.CloneSiteVersionRequest(name);
    const response = await this.makeRequest(method, path, request, Endpoints.CloneSiteVersionResponse);
    return response.siteVersion;
  }

  public archive_site_version = async (siteId: number, siteVersionId: number): Promise<Resources.SiteVersion> => {
    const method = RestMethod.POST;
    const path = `v1/sites/${siteId}/versions/${siteVersionId}/archive`;
    const request = new Endpoints.ArchiveSiteVersionRequest(name);
    const response = await this.makeRequest(method, path, request, Endpoints.ArchiveSiteVersionResponse);
    return response.siteVersion;
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

  public list_template_categories = async (): Promise<Resources.TemplateCategory[]> => {
    const method = RestMethod.GET;
    const path = `v1/template-categories`;
    const request = new Endpoints.ListTemplateCategoriesRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.ListTemplateCategoriesResponse);
    return response.templateCategories;
  }

  public create_template_category = async (name: string): Promise<Resources.TemplateCategory> => {
    const method = RestMethod.POST;
    const path = `v1/template-categories`;
    const request = new Endpoints.CreateTemplateCategoryRequest(name);
    const response = await this.makeRequest(method, path, request, Endpoints.CreateTemplateCategoryResponse);
    return response.templateCategory;
  }

  public get_template_category = async (templateCategoryId: number): Promise<Resources.TemplateCategory> => {
    const method = RestMethod.GET;
    const path = `v1/template-categories/${templateCategoryId}`;
    const request = new Endpoints.GetTemplateCategoryRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.GetTemplateCategoryResponse);
    return response.templateCategory;
  }

  public list_templates = async (templateCategoryId?: number): Promise<Resources.Template[]> => {
    const method = RestMethod.GET;
    const path = `v1/templates`;
    const request = new Endpoints.ListTemplatesRequest(templateCategoryId);
    const response = await this.makeRequest(method, path, request, Endpoints.ListTemplatesResponse);
    return response.templates;
  }

  public create_template = async (name: string, description: string, siteId: number, templateCategoryId: number): Promise<Resources.Template> => {
    const method = RestMethod.POST;
    const path = `v1/templates`;
    const request = new Endpoints.CreateTemplateRequest(name, description, siteId, templateCategoryId);
    const response = await this.makeRequest(method, path, request, Endpoints.CreateTemplateResponse);
    return response.template;
  }

  public get_template = async (templateId: number): Promise<Resources.Template> => {
    const method = RestMethod.GET;
    const path = `v1/templates/${templateId}`;
    const request = new Endpoints.GetTemplateRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.GetTemplateResponse);
    return response.template;
  }

  public get_site_version_entry_for_template = async (templateId: number): Promise<Resources.SiteVersionEntry> => {
    const method = RestMethod.GET;
    const path = `v1/templates/${templateId}/site-version-entry`;
    const request = new Endpoints.GetSiteVersionEntryForTemplateRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.GetSiteVersionEntryForTemplateResponse);
    return response.siteVersionEntry;
  }

  public list_section_categories = async (): Promise<Resources.SectionCategory[]> => {
    const method = RestMethod.GET;
    const path = `v1/section-categories`;
    const request = new Endpoints.ListSectionCategoriesRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.ListSectionCategoriesResponse);
    return response.sectionCategories;
  }

  public create_section_category = async (name: string): Promise<Resources.SectionCategory> => {
    const method = RestMethod.POST;
    const path = `v1/section-categories`;
    const request = new Endpoints.CreateSectionCategoryRequest(name);
    const response = await this.makeRequest(method, path, request, Endpoints.CreateSectionCategoryResponse);
    return response.sectionCategory;
  }

  public get_section_category = async (sectionCategoryId: number): Promise<Resources.SectionCategory> => {
    const method = RestMethod.GET;
    const path = `v1/section-categories/${sectionCategoryId}`;
    const request = new Endpoints.GetSectionCategoryRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.GetSectionCategoryResponse);
    return response.sectionCategory;
  }

  public list_sections = async (sectionCategoryId?: number): Promise<Resources.Section[]> => {
    const method = RestMethod.GET;
    const path = `v1/sections`;
    const request = new Endpoints.ListSectionsRequest(sectionCategoryId);
    const response = await this.makeRequest(method, path, request, Endpoints.ListSectionsResponse);
    return response.sections;
  }

  public create_section = async (name: string, description: string, sectionType: string, sectionCategoryId: number, previewImageUrl: string, content: Record<string, any>): Promise<Resources.Section> => {
    const method = RestMethod.POST;
    const path = `v1/sections`;
    const request = new Endpoints.CreateSectionRequest(name, description, sectionType, sectionCategoryId, previewImageUrl, content);
    const response = await this.makeRequest(method, path, request, Endpoints.CreateSectionResponse);
    return response.section;
  }

  public get_section = async (sectionId: number): Promise<Resources.Section> => {
    const method = RestMethod.GET;
    const path = `v1/sections/${sectionId}`;
    const request = new Endpoints.GetSectionRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.GetSectionResponse);
    return response.section;
  }

  public get_ios_app = async (iosAppId: string): Promise<Resources.IosApp> => {
    const method = RestMethod.GET;
    const path = `v1/ios-apps/${iosAppId}`;
    const request = new Endpoints.GetIosAppRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.GetIosAppResponse);
    return response.iosApp;
  }

  public get_android_app = async (androidAppId: string): Promise<Resources.AndroidApp> => {
    const method = RestMethod.GET;
    const path = `v1/android-apps/${androidAppId}`;
    const request = new Endpoints.GetAndroidAppRequest();
    const response = await this.makeRequest(method, path, request, Endpoints.GetAndroidAppResponse);
    return response.androidApp;
  }
}
