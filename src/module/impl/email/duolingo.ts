/*
 * @file duolingo.ts
 * @author David @dvhsh (https://dvh.sh)
 * @updated Thu Aug 9 2024
 * @description Duolingo email module
 */
import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "duolingo",
    description : "Searches for Duolingo profile info based on a given email.",

    thumbnail   : "",

    updatedAt   : "Sun Jun 30 2024",

    category    : ModuleCategory.Email,
    type        : ModuleType.Enrichment,
}

const SANDBOX: any = {

}

export class Duolingo extends Module {

    constructor() { super(META, SANDBOX); }

    public async query(email: string): Promise<any> {

        const response = await axios.get(`https://www.duolingo.com/2017-06-30/users`, {
            params: {
                email
            }, headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
            }
        });

        const exists = response.data.users.length > 0;

        return {
            status : exists ? 200                    : 404,
            data   : exists ? response.data.users[0] : null,
        };
    }
}

module.exports = new Duolingo;

// Path: src/module/impl/email/duolingo.ts
