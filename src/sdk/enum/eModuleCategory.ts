/*
 * @file eModuleCategory.ts
 * @author David @dvhsh (https://dvh.sh)
 * @updated Thu Aug 9 2024
 * @description Enum for module categories / query types
 */

/*
    * @return { ModuleCategory }
    * @description Used to define the category of an OSINT module based on its query input.
 */
export enum ModuleCategory {
    Username = 'username',
    Phone    = 'phone',
    Email    = 'email',
    IP       = 'ip',
    Domain   = 'domain',
}

// Path: src/sdk/enum/eModuleCategory.ts
