import type { Config } from "../src/lib/interfaces/config.js";
import { Init } from "../src/lib/init.js";
import { json } from "stream/consumers";


describe("Categories", () => {

    const envConfigs = process.env;

    const configBaseTest:Config = {
        partnerId: envConfigs.PARTNER_ID!,
        partnerKey: envConfigs.PARTNER_KEY!,
        shoppeUrl: envConfigs.SHOPEE_URL!
    }
    Init(configBaseTest);

    it.skip("GetCategory", async () => {

        const categoriesModule = await import("../src/lib/shopee/categories/categories.js");
        const GetCategory = categoriesModule.GetCategory;

        const accessToken = envConfigs.ACCESS_TOKEN_TEST
        const shopId = parseInt(envConfigs.SHOP_ID_TEST!);
        const language = 'pt-br';
        const response = await GetCategory(accessToken!, shopId, language);
        expect(response).not.toBeUndefined();
    })

    it("GetAttributeTree", async () => {
        const categoriesModule = await import("../src/lib/shopee/categories/categories.js");
        const GetAttributeTree = categoriesModule.GetAttributeTree;

        const accessToken = envConfigs.ACCESS_TOKEN_TEST
        const shopId = parseInt(envConfigs.SHOP_ID_TEST!);
        const categoryId = 106331;
        const response = await GetAttributeTree(categoryId, accessToken!, shopId);
        console.log(JSON.stringify(response.response, null, 2));
        expect(response).not.toBeUndefined();
    })
})