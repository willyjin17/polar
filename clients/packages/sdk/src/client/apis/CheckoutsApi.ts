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
  Checkout,
  CheckoutCreate,
  HTTPValidationError,
} from '../models/index';

export interface CheckoutsApiCreateRequest {
    body: CheckoutCreate;
}

export interface CheckoutsApiGetRequest {
    id: string;
}

/**
 * 
 */
export class CheckoutsApi extends runtime.BaseAPI {

    /**
     * Create a checkout session.
     * Create Checkout
     */
    async createRaw(requestParameters: CheckoutsApiCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Checkout>> {
        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling create().'
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
            path: `/v1/checkouts/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['body'],
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Create a checkout session.
     * Create Checkout
     */
    async create(requestParameters: CheckoutsApiCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Checkout> {
        const response = await this.createRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get an active checkout session by ID.
     * Get Checkout
     */
    async getRaw(requestParameters: CheckoutsApiGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Checkout>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling get().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/checkouts/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Get an active checkout session by ID.
     * Get Checkout
     */
    async get(requestParameters: CheckoutsApiGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Checkout> {
        const response = await this.getRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
