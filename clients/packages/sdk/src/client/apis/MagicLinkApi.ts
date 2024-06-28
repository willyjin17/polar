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
  MagicLinkRequest,
} from '../models/index';

export interface MagicLinkApiMagicLinkAuthenticateRequest {
    token: string;
    returnTo?: string;
}

export interface MagicLinkApiMagicLinkRequestRequest {
    body: MagicLinkRequest;
}

/**
 * 
 */
export class MagicLinkApi extends runtime.BaseAPI {

    /**
     * Magic Link.Authenticate
     */
    async magicLinkAuthenticateRaw(requestParameters: MagicLinkApiMagicLinkAuthenticateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        if (requestParameters['token'] == null) {
            throw new runtime.RequiredError(
                'token',
                'Required parameter "token" was null or undefined when calling magicLinkAuthenticate().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['token'] != null) {
            queryParameters['token'] = requestParameters['token'];
        }

        if (requestParameters['returnTo'] != null) {
            queryParameters['return_to'] = requestParameters['returnTo'];
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
            path: `/v1/magic_link/authenticate`,
            method: 'GET',
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
     * Magic Link.Authenticate
     */
    async magicLinkAuthenticate(requestParameters: MagicLinkApiMagicLinkAuthenticateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.magicLinkAuthenticateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Magic Link.Request
     */
    async magicLinkRequestRaw(requestParameters: MagicLinkApiMagicLinkRequestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling magicLinkRequest().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/v1/magic_link/request`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters['body'],
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Magic Link.Request
     */
    async magicLinkRequest(requestParameters: MagicLinkApiMagicLinkRequestRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.magicLinkRequestRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
