import {  getConfig, Init } from "../src/lib/init.js";
import type { Config } from "../src/lib/interfaces/config.js";

const envConfigs = process.env;
const configBaseTest:Config = {
    partnerId: envConfigs.PARTNER_ID!,
    partnerKey: envConfigs.PARTNER_KEY!,
    shoppeUrl: envConfigs.SHOPEE_URL!
}

describe('Init', () => {

    it('It must init the config', () => {
        
        Init(configBaseTest);

        const configResult = getConfig();
        expect(configResult).not.toBeUndefined();
    })

})