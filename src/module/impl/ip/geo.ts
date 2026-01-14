/*
 * @file geo.ts
 * @author David @dvhsh (https://dvh.sh)
 * @updated Thu Aug 9 2024
 * @description Geolocation IP module
 */
import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "geo",
    description : "Searches a location for a given IP address.",

    thumbnail   : "",

    updatedAt   : "Sun Jun 30 2024",

    category    : ModuleCategory.IP,
    type        : ModuleType.Enrichment,
}

const SANDBOX: any = {

}

export class Geo extends Module {

    constructor() { super(META, SANDBOX); }

    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://ipapi.co/${query}/json/`)

        const exists = response.data !== '';

        return {
            status : exists ? 200           : 404,
            data   : exists ? response.data : null,
        }
    }
}

module.exports = new Geo;

// Path: src/module/impl/ip/geo.ts
