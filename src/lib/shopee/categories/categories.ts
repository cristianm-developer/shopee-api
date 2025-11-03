import { getConfig } from "../../init.js";
import { createSign } from '../../utils/sign.js';


export const GetCategory = async(accessToken: string, shopId: number) => {
    const config = getConfig();
    const categoryPath = '/api/v2/product/get_category';
    const partner_id = config.partnerId;
    const [sign, timestamp] = createSign(categoryPath);
    const query = new URLSearchParams({
        partner_id: partner_id,
        timestamp: timestamp.toString(),
        sign: sign.toString(),
    })
}