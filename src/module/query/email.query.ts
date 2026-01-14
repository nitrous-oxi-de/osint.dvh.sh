/*
 * @file email.query.ts
 * @author David @dvhsh (https://dvh.sh)
 * @updated Thu Aug 9 2024
 * @description Email query standardization bounding
 */
import IQueryStandardization from "@interface/iQueryStandardization";
import { ModuleCategory }    from "@enum/eModuleCategory";

export default class EmailQuery implements IQueryStandardization {

    readonly category    : ModuleCategory = ModuleCategory.Email;

    readonly minLength   : number = 5;
    readonly maxLength   : number = 255;

    // just check for x@x.x, not validation, only standardization
    readonly regex     ? : RegExp = /^.+@.+\..+$/
}

module.exports = new EmailQuery;

// Path: src/module/query/email.query.ts
