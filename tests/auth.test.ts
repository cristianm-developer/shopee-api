import { Init } from "../src/lib/init.js";
import type { Config } from "../src/lib/interfaces/config.js";


const liveTest = process.env.LIVE_TEST === 'true';

describe("Auth", () => {

    const envConfigs = process.env;
    const configBaseTest:Config = {
        partnerId: envConfigs.PARTNER_ID!,
        partnerKey: envConfigs.PARTNER_KEY!,
        shoppeUrl: envConfigs.SHOPEE_URL!
    }
    Init(configBaseTest);
    

    it.skip('GenerateAuthUrl', async () => {
        const authModule = await import("../src/lib/shopee/auth/auth.js");
        const GetAuthUrl = authModule.GetAuthUrl;

        const redirectUri = 'https://www.example.com';

        const authUrl = GetAuthUrl(redirectUri);

        console.log(authUrl);
        expect(authUrl).not.toBeUndefined();
    })

    it.skip('ExchangeOttCode', async () => {


        const authModule = await import("../src/lib/shopee/auth/auth.js");
        const ExchangeOttCode = authModule.ExchangeOttCode;

        const code = '6a646c6b4279476b7777674e6e744473';
        const id = 226120388;
        const type = 'shop';

        const response = await ExchangeOttCode(code, id, type);

        console.log(response);
        expect(response).not.toBeUndefined();
    })

    it.skip('RefreshAccessToken', async () => {

        const tokenRet =  {
            partner_id: 1194159,
            refresh_token: 'eyJhbGciOiJIUzI1NiJ9.CK_xSBABGMSl6WsgAiif-67IBjD9vdX0CDgBQAE.4-IRzFt-qRoqao1TZQSR5veTO5RIqC-BLANgMmKzin4',         
            access_token: 'eyJhbGciOiJIUzI1NiJ9.CK_xSBABGMSl6WsgASif-67IBjCxlvi8DTgBQAE.zAOJd8Tj80ZeWiUCLpEbMOf87nWOQBqtqsthyl8Ej_k',
            expire_in: 14400,
            request_id: 'e3e3e7f342df662cf6714b963a407001',
            error: '',
            message: '',
            shop_id: 226120388
        }

        const authModule = await import("../src/lib/shopee/auth/auth.js");
        const RefreshAccessToken = authModule.RefreshAccessToken;

        const response = await RefreshAccessToken(tokenRet.refresh_token,  tokenRet.shop_id , 'shop');

        console.log(response);
        expect(response).not.toBeUndefined();

    })

});
