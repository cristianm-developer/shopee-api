import { GetAuthUrl } from "../src/lib/shopee/auth/auth.js";
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

    beforeAll(() => {
        console.log('initing')
    })

    it('GenerateAuthUrl', () => {

        console.log('taest');
        const redirectUri = 'https://example.com';

        const authUrl = GetAuthUrl(redirectUri);

        expect(authUrl).toBe(redirectUri);

    })

});
