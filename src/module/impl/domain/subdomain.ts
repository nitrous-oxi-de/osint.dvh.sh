/*
 * @file subdomain.ts
 * @author David @dvhsh (https://dvh.sh)
 * @updated Thu Aug 9 2024
 * @description Subdomain domain module
 */
import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "subdomain",
    description : "Searches for subdomains within a given domain name.",

    thumbnail   : "",

    updatedAt   : "Sun Jun 30 2024",


    category    : ModuleCategory.Domain,
    type        : ModuleType.Enrichment,
}

const SANDBOX: any = {

}

export class Subdomain extends Module {

    constructor() { super(META, SANDBOX); }

    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://crt.sh/?q=${query}`)

        const subs = response.data.split('<TD>')[5].split('</TD>')[0].split('<BR>');

        const exists = subs.length > 0;

        return {
            status : exists ? 200  : 404,
            data   : exists ? subs : null,
        }
    }
}

module.exports = new Subdomain;

// Path: src/module/impl/domain/subdomain.ts
