/* tslint:disable */
/* eslint-disable */
/**
 * Polar API
 * Read the docs at https://docs.polar.sh/api-reference
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
  EmailUpdateRequest,
  HTTPValidationError,
} from '../models/index';

export interface EmailUpdateApiRequestEmailUpdateRequest {
    body: EmailUpdateRequest;
}

export interface EmailUpdateApiVerifyEmailUpdateRequest {
    token: string;
    returnTo?: string | null;
}

/**
 * 
 */
export class EmailUpdateApi extends runtime.BaseAPI {

    /**
     * Request Email Update
     */
    async requestEmailUpdateRaw(requestParameters: EmailUpdateApiRequestEmailUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        if (requestParameters['body'] == null) {
            throw new runtime.RequiredError(
                'body',
                'Required parameter "body" was null or undefined when calling requestEmailUpdate().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("pat", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("oat", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/email-update/request`,
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
     * Request Email Update
     */
    async requestEmailUpdate(requestParameters: EmailUpdateApiRequestEmailUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.requestEmailUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Verify Email Update
     */
    async verifyEmailUpdateRaw(requestParameters: EmailUpdateApiVerifyEmailUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        if (requestParameters['token'] == null) {
            throw new runtime.RequiredError(
                'token',
                'Required parameter "token" was null or undefined when calling verifyEmailUpdate().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['returnTo'] != null) {
            queryParameters['return_to'] = requestParameters['returnTo'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const consumes: runtime.Consume[] = [
            { contentType: 'application/x-www-form-urlencoded' },
        ];
        // @ts-ignore: canConsumeForm may be unused
        const canConsumeForm = runtime.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any };
        let useForm = false;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new URLSearchParams();
        }

        if (requestParameters['token'] != null) {
            formParams.append('token', requestParameters['token'] as any);
        }

        const response = await this.request({
            path: `/v1/email-update/verify`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: formParams,
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * Verify Email Update
     */
    async verifyEmailUpdate(requestParameters: EmailUpdateApiVerifyEmailUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.verifyEmailUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
