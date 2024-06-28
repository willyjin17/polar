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
  ListResourcePaymentMethod,
  PaymentMethod,
} from '../models/index';

export interface PaymentMethodsApiDetachRequest {
    id: string;
}

/**
 * 
 */
export class PaymentMethodsApi extends runtime.BaseAPI {

    /**
     * Detach
     */
    async detachRaw(requestParameters: PaymentMethodsApiDetachRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PaymentMethod>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling detach().'
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
            path: `/v1/payment_methods/{id}/detach`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * Detach
     */
    async detach(requestParameters: PaymentMethodsApiDetachRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PaymentMethod> {
        const response = await this.detachRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List
     */
    async listRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListResourcePaymentMethod>> {
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
            path: `/v1/payment_methods`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response);
    }

    /**
     * List
     */
    async list(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListResourcePaymentMethod> {
        const response = await this.listRaw(initOverrides);
        return await response.value();
    }

}
