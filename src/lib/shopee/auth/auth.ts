import { AxiosError } from "axios";
import { AuthError } from "../../errors/AuthError.js";
import { getConfig } from "../../init.js";
import type { ExchangeCodeResponse } from "../../interfaces/auth/exchangeOttCode.js";
import { apiClient } from "../../middleware/axios.js";
import { createSign } from "../../utils/sign.js";


export const GetAuthUrl = (redirectUri: string) => {
    const config = getConfig();

    const baseUrl = config.shoppeUrl;
    const authPath = '/api/v2/shop/auth_partner';
    const url = `${baseUrl}/${authPath}`;
    const [sign, timestamp] = createSign(url);
    const queryParams = {
        partner_id: config.partnerId,
        timestamp: timestamp!.toString(),
        sign: sign!.toString(),
        redirect_uri: redirectUri,
    };

    const queryString = new URLSearchParams(queryParams)
    const fullUrl = `${url}?${queryString.toString()}`;

    return fullUrl;

}

export const ExchangeOttCode = async (code: string, id: number, type: 'shop' | 'merchant') => {
    const config = getConfig();


    const exchangePath = '/api/v2/auth/token/get';
    const partner_id = config.partnerId;
    const [sign, timestamp] = createSign(exchangePath);
    
    const query = new URLSearchParams({
        partner_id: partner_id,
        timestamp: timestamp!.toString(),
        sign: sign!.toString(),
    })

    const body: Record<string, string | number> = {
        code,
        partner_id,
    }

    body[type === 'shop' ? 'shop_id' : 'merchant_id'] = id;

    try {
        const response = await apiClient.post<ExchangeCodeResponse>(exchangePath, body, {params: query});
        if(response.data.error) {
            throw new AuthError(response.data.error);
        }
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            throw new AuthError(error.response?.data.error);
        }
        throw error;
    }
    
}

export const RefreshAccessToken = async (refreshToken: string, id: number, type: 'shop' | 'merchant') => {
    const config = getConfig();

    const refreshPath = '/api/v2/auth/token/refresh';
    const partner_id = config.partnerId;
    const [sign, timestamp] = createSign(refreshPath);
    const query = new URLSearchParams({
        partner_id: partner_id,
        timestamp: timestamp!.toString(),
        sign: sign!.toString(),
    })

    const body: Record<string, string | number> = {
        partner_id: partner_id,
        refresh_token: refreshToken,
    }

    body[type === 'shop' ? 'shop_id' : 'merchant_id'] = id;

    try {
        const response = await apiClient.post<ExchangeCodeResponse>(refreshPath, body, {params: query});
        if(response.data.error) {
            throw new AuthError(response.data.error);
        }
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            throw new AuthError(error.response?.data.error);
        }
        throw error;
    }
}