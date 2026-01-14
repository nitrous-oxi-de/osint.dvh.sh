/*
 * @file snusbase-passwords.ts
 * @author David @dvhsh (https://dvh.sh)
 * @updated Thu Aug 9 2024
 * @description Snusbase email module
 */
import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "snusbase-passwords",
    description : "Searches the Snusbase API v2 for passwords associated with a given email address",

    thumbnail   : "",

    updatedAt   : "Sun Jun 30 2024",

    category    : ModuleCategory.Email,
    type        : ModuleType.Enrichment,
}

const SANDBOX: any = {

}

export class SnusbasePasswords extends Module {

    constructor() { super(META, SANDBOX); }

    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://beta.snusbase.com/v2/combo/${query}`);

        if (response.data.size === 0) {

            return {
                status : 404,
                data   : null,
            };
        }

        let passwords: string[] = [];

        Object.keys(response.data.result).forEach((key: string) => {

            response.data.result[key].forEach((entry: any) => {

                passwords.push(entry.password);
            });
        });

        return {
            status : 200,
            data   : passwords,
        };
    }
}

module.exports = new SnusbasePasswords;

// Path: src/module/impl/email/snusbasePasswords.ts
