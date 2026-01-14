/*
 * @file iModuleMeta.ts
 * @author David @dvhsh (https://dvh.sh)
 * @updated Thu Aug 9 2024
 * @description Interface for module metadata
 */
import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

/*
    * @return { ModuleMeta }
    * @description Interface for module metadata.
*/
export interface ModuleMeta {
    name        : string;
    description : string;
    
    thumbnail   : string;

    updatedAt   : string;

    category    : ModuleCategory;
    type        : ModuleType;
}

// Path: src/sdk/interface/iModuleMeta.ts
