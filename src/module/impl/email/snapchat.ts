/*
 * @file snapchat.ts
 * @author David @dvhsh (https://dvh.sh)
 * @updated Thu Aug 9 2024
 * @description Snapchat email module
 */
import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "snapchat",
    description : "Searches for SnapChat profile existence based on a given username.",

    thumbnail   : "",

    updatedAt   : "Sun Jun 30 2024",

    category    : ModuleCategory.Email,
    type        : ModuleType.Existence,
}

const SANDBOX: any = {

}

export class Snapchat extends Module {

    constructor() { super(META, SANDBOX); }

    public async query(query: string): Promise<any> {

        const response = await axios.post('https://bitmoji.api.snapchat.com/api/user/find',
            {
                email: query,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

        const exists = JSON.stringify(response.data).includes('{"account_type":"bitmoji"}');

        return {
            status : exists ? 200  : 404,
            data   : exists ? true : null,
        }
    }
}

module.exports = new Snapchat;

// Path: src/module/impl/email/snapchat.ts
