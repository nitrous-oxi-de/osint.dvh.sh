/*
 * @file phone.query.ts
 * @author David @dvhsh (https://dvh.sh)
 * @updated Thu Aug 9 2024
 * @description Phone query standardization bounding
 */
import IQueryStandardization from "@interface/iQueryStandardization";
import { ModuleCategory }    from "@enum/eModuleCategory";

export default class PhoneQuery implements IQueryStandardization {

    readonly category    : ModuleCategory = ModuleCategory.Phone;

    readonly minLength   : number = 5;
    readonly maxLength   : number = 255;

    // e164 format +1 123 456 7890 (no spaces, plus sign, or dashes)
    readonly regex     ? : RegExp = /^\+?[0-9]{1,3}[0-9]{3}[0-9]{3}[0-9]{4}$/;
}

module.exports = new PhoneQuery;

// Path: src/module/query/phone.query.ts
