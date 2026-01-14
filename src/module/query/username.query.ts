/*
 * @file username.query.ts
 * @author David @dvhsh (https://dvh.sh)
 * @updated Thu Aug 9 2024
 * @description Username query standardization bounding
 */
import IQueryStandardization from "@interface/iQueryStandardization";
import { ModuleCategory }    from "@enum/eModuleCategory";

export default class UsernameQuery implements IQueryStandardization {

    readonly category    : ModuleCategory = ModuleCategory.Username;

    readonly minLength   : number = 3;
    readonly maxLength   : number = 255;

    // no regex for usernames
}

module.exports = new UsernameQuery;

// Path: src/module/query/username.query.ts
