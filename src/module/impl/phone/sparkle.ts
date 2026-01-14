/*
 * @file sparkle.ts
 * @author David @dvhsh (https://dvh.sh)
 * @updated Thu Aug 9 2024
 * @description Sparkle phone module
 */
import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "sparkle",
    description : "Searches for a name using a given phone number.",

    thumbnail   : "",

    updatedAt   : "Thu Aug 1 2024",

    category    : ModuleCategory.Phone,
    type        : ModuleType.Enrichment,
}

const SANDBOX: any = {

}

export class Sparkle extends Module {

    constructor() { super(META, SANDBOX); }

    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://sparkle-api.vercel.app/api/number-info.ts?number=${query}`, {});

        const exists = response.data.name !== '';

        return {
            status : exists ? 200           : 404,
            data   : exists ? response.data : null,
        }

    }
}

module.exports = new Sparkle;

// Path: src/module/impl/phone/sparkle.ts
