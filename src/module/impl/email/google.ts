/*
 * @file google.ts
 * @author David @dvhsh (https://dvh.sh)
 * @updated Thu Aug 9 2024
 * @description Google email module
 */
import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import { exec }           from "child_process";

import path               from "path";
import fs                 from "fs";

const META: ModuleMeta = {
    name        : "google",
    description : "Searches Google profile info using Ghunt based on a given gmail address.",

    thumbnail   : "",

    updatedAt   : "Sun Jun 30 2024",

    category    : ModuleCategory.Email,
    type        : ModuleType.Enrichment,
}

const SANDBOX: any = {

}

export class Google extends Module {

    constructor() { super(META, SANDBOX); }

    public async query(query: string): Promise<any> {
        const tempPath = path.join(__dirname, "temp");
        const outputPath = path.join(tempPath, `${query}.json`);

        // Ensure temp directory exists
        if (!fs.existsSync(tempPath)) {
            fs.mkdirSync(tempPath, { recursive: true });
        }

        const execQuery: string = `ghunt email ${query} --json ${outputPath}`;

        await new Promise<void>((resolve, reject) => {
            exec(execQuery, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });

        // Check if the JSON file exists
        if (fs.existsSync(outputPath)) {
            const data = JSON.parse(fs.readFileSync(outputPath, "utf8"));
            fs.unlinkSync(outputPath); // Clean up after reading

            // Extracting relevant data
            const { personId } = data.PROFILE_CONTAINER.profile;
            const email = data.PROFILE_CONTAINER.profile.emails.PROFILE.value;
            const lastUpdated = data.PROFILE_CONTAINER.profile.sourceIds.PROFILE.lastUpdated;
            const profilePhotoUrl = data.PROFILE_CONTAINER.profile.profilePhotos.PROFILE.url;
            const coverPhotoUrl = data.PROFILE_CONTAINER.profile.coverPhotos.PROFILE.url;
            const mapsUrl = `https://www.google.com/maps/contrib/${personId}`

            return {
                status: 200,
                data: {
                    personId,
                    email,
                    lastUpdated,
                    profilePhotoUrl,
                    coverPhotoUrl,
                    mapsUrl,
                },
            };
        } else {
            return {
                status: 404,
                data: null,
            };
        }
    }
}

module.exports = new Google;

// Path: src/module/impl/email/google.ts
