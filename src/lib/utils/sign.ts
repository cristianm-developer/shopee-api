import { getConfig } from "../init.js";
import { createHmac } from 'crypto';


const config = getConfig();
export const createSign = (path: string, userInfo: {accessToken?: string, shopId?: number} = {}) : [string, number] => {

    
    const timestamp = Math.floor(Date.now() / 1000);
    const partnerId = config.partnerId.toString();
    const partnerKey = config.partnerKey;
    let baseString = `${partnerId}/${path}${timestamp}`;

    if( userInfo?.accessToken) {
        baseString += `${userInfo.accessToken}`;
    }
    if( userInfo?.shopId) {
        baseString += `${userInfo.shopId}`;
    }

    const hmac = createHmac('sha256', partnerKey);
    hmac.update(baseString);

    const sign = hmac.digest('hex');

    return [sign, timestamp];
}