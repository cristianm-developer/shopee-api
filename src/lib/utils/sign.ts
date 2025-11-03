import { getConfig } from "../init";
import crypto from 'crypto';


const config = getConfig();
export const createSign = (path: string) => {

    const timestamp = Math.floor(Date.now() / 1000);
    const partnerId = config.partnerId.toString();
    const partnerKey = config.partnerKey;
    const baseString = `${partnerId}${path}${timestamp}`;

    const hmac = crypto.createHmac('sha256', partnerKey);
    hmac.update(baseString);

    const sign = hmac.digest('hex');

    return [sign, timestamp];
}