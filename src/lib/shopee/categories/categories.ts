import { AxiosError } from "axios";
import { getConfig } from "../../init.js";
import { apiClient } from "../../middleware/axios.js";
import { createSign } from '../../utils/sign.js';



export const GetCategory = async(accessToken: string, shopId: number, language = 'pt-BR') => {
    const config = getConfig();
    const categoryPath = 'api/v2/product/get_category';

    const partner_id = config.partnerId;
    const [sign, timestamp] = createSign(categoryPath, {accessToken, shopId});
    const query = new URLSearchParams({
        partner_id: partner_id,
        timestamp: timestamp.toString(),
        sign: sign.toString(),
        access_token: accessToken,
        shop_id: shopId.toString(),
        language: language,
    })

    try {
        const response = await apiClient.get(categoryPath, {params: query});
        if(response.data.error) {
            throw new Error(response.data.error);
        }
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            throw new Error(error.response?.data.error);
        }
        throw error;
    }

}

export const GetAttributeTree = async(categoryId:number, accessToken:string, shopId:number, language = 'pt-BR') => {

    const config = getConfig();
    const attributeTreePath = 'api/v2/product/get_attribute_tree';

    const partner_id = config.partnerId;
    const [sign, timestamp] = createSign(attributeTreePath, {accessToken, shopId});
    const query = new URLSearchParams({
        partner_id: partner_id,
        timestamp: timestamp.toString(),
        sign: sign.toString(),
        access_token: accessToken,
        shop_id: shopId.toString(),
        language: language,
        category_id_list: categoryId.toString(),
    });

    try {
        const response = await apiClient.get(attributeTreePath, {params: query});
        if(response.data.error) {
            throw new Error(response.data.error);
        }
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError) {
            throw new Error(error.response?.data.error);
        }
        throw error;
    }
}