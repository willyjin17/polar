/* tslint:disable */
/* eslint-disable */
/**
 * Polar API
 * Read the docs at https://polar.sh/docs/api-reference
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  HTTPValidationError,
  ListResourceWebhookDelivery,
  ListResourceWebhookEndpoint,
  NotPermitted,
  ResourceNotFound,
  WebhookEndpoint,
  WebhookEndpointCreate,
  WebhookEndpointUpdate,
} from '../models/index';

export interface WebhooksApiCreateWebhookEndpointRequest {
    body: WebhookEndpointCreate;
}

export interface WebhooksApiDeleteWebhookEndpointRequest {
    id: string;
}

export interface WebhooksApiGetWebhookEndpointRequest {
    id: string;
}

export interface WebhooksApiListWebhookDeliveriesRequest {
    endpointId?: string;
    page?: number;
    limit?: number;
}

export interface WebhooksApiListWebhookEndpointsRequest {
    organizationId?: string;
    userId?: string;
    page?: number;
    limit?: number;
}

export interface WebhooksApiRedeliverWebhookEventRequest {
    id: string;
}

export interface WebhooksApiUpdateWebhookEndpointRequest {
    id: string;
    body: WebhookEndpointUpdate;
}

/**
 * 
 */
export class WebhooksApi extends runtime.BaseAPI {

    /**
     * Create a webhook endpoint.
     * Create Webhook Endpoint
     */
    async createWebhookEndpointRaw(requestParameters: WebhooksApiCreateWebhookEndpointRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<WebhookEndpoint>> {
        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling createWebhookEndpoint().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/webhooks/endpoints`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['body'],
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Create a webhook endpoint.
     * Create Webhook Endpoint
     */
    async createWebhookEndpoint(requestParameters: WebhooksApiCreateWebhookEndpointRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<WebhookEndpoint> {
        const response = await this.createWebhookEndpointRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete a webhook endpoint.
     * Delete Webhook Endpoint
     */
    async deleteWebhookEndpointRaw(requestParameters: WebhooksApiDeleteWebhookEndpointRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling deleteWebhookEndpoint().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/webhooks/endpoints/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete a webhook endpoint.
     * Delete Webhook Endpoint
     */
    async deleteWebhookEndpoint(requestParameters: WebhooksApiDeleteWebhookEndpointRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteWebhookEndpointRaw(requestParameters, initOverrides);
    }

    /**
     * Get a webhook endpoint by ID.
     * Get Webhook Endpoint
     */
    async getWebhookEndpointRaw(requestParameters: WebhooksApiGetWebhookEndpointRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<WebhookEndpoint>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getWebhookEndpoint().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/webhooks/endpoints/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Get a webhook endpoint by ID.
     * Get Webhook Endpoint
     */
    async getWebhookEndpoint(requestParameters: WebhooksApiGetWebhookEndpointRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<WebhookEndpoint> {
        const response = await this.getWebhookEndpointRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List webhook deliveries.  Deliveries are all the attempts to deliver a webhook event to an endpoint.
     * List Webhook Deliveries
     */
    async listWebhookDeliveriesRaw(requestParameters: WebhooksApiListWebhookDeliveriesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListResourceWebhookDelivery>> {
        const queryParameters: any = {};

        if (requestParameters['endpointId'] != null) {
            queryParameters['endpoint_id'] = requestParameters['endpointId'];
        }

        if (requestParameters['page'] != null) {
            queryParameters['page'] = requestParameters['page'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/webhooks/deliveries`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * List webhook deliveries.  Deliveries are all the attempts to deliver a webhook event to an endpoint.
     * List Webhook Deliveries
     */
    async listWebhookDeliveries(requestParameters: WebhooksApiListWebhookDeliveriesRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListResourceWebhookDelivery> {
        const response = await this.listWebhookDeliveriesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List webhook endpoints.
     * List Webhook Endpoints
     */
    async listWebhookEndpointsRaw(requestParameters: WebhooksApiListWebhookEndpointsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListResourceWebhookEndpoint>> {
        const queryParameters: any = {};

        if (requestParameters['organizationId'] != null) {
            queryParameters['organization_id'] = requestParameters['organizationId'];
        }

        if (requestParameters['userId'] != null) {
            queryParameters['user_id'] = requestParameters['userId'];
        }

        if (requestParameters['page'] != null) {
            queryParameters['page'] = requestParameters['page'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/webhooks/endpoints`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * List webhook endpoints.
     * List Webhook Endpoints
     */
    async listWebhookEndpoints(requestParameters: WebhooksApiListWebhookEndpointsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListResourceWebhookEndpoint> {
        const response = await this.listWebhookEndpointsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Schedule the re-delivery of a webhook event.
     * Redeliver Webhook Event
     */
    async redeliverWebhookEventRaw(requestParameters: WebhooksApiRedeliverWebhookEventRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling redeliverWebhookEvent().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/webhooks/events/{id}/redeliver`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Schedule the re-delivery of a webhook event.
     * Redeliver Webhook Event
     */
    async redeliverWebhookEvent(requestParameters: WebhooksApiRedeliverWebhookEventRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.redeliverWebhookEventRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update a webhook endpoint.
     * Update Webhook Endpoint
     */
    async updateWebhookEndpointRaw(requestParameters: WebhooksApiUpdateWebhookEndpointRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<WebhookEndpoint>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling updateWebhookEndpoint().'
            );
        }

        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling updateWebhookEndpoint().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("HTTPBearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/webhooks/endpoints/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['body'],
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Update a webhook endpoint.
     * Update Webhook Endpoint
     */
    async updateWebhookEndpoint(requestParameters: WebhooksApiUpdateWebhookEndpointRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<WebhookEndpoint> {
        const response = await this.updateWebhookEndpointRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
