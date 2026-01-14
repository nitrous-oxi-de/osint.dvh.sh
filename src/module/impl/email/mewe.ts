/*
 * @file mewe.ts
 * @author David @dvhsh (https://dvh.sh)
 * @updated Thu Aug 9 2024
 * @description MeWe email module
 */
import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "mewe",
    description : "Searches for MeWe profile existence based on a given username.",

    thumbnail   : "",

    updatedAt   : "Sun Jun 30 2024",

    category    : ModuleCategory.Email,
    type        : ModuleType.Existence,
};

const SANDBOX: any = {

}

export class MeWe extends Module {

    constructor() {
        super(META, SANDBOX);
    }

    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://mewe.com/api/v2/auth/checkEmail?email=${query}`);
        const exists = response.data.errorCode === 109;

        return {
            status : exists ? 200  : 404,
            data   : exists ? true : null,
        };
    }
}

module.exports = new MeWe;

// Path: src/module/impl/email/mewe.ts
