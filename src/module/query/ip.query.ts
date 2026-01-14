/*
 * @file ip.query.ts
 * @author David @dvhsh (https://dvh.sh)
 * @updated Thu Aug 9 2024
 * @description IP query standardization bounding
 */
import IQueryStandardization from "@interface/iQueryStandardization";
import { ModuleCategory }    from "@enum/eModuleCategory";

export default class IpQuery implements IQueryStandardization {

    readonly category    : ModuleCategory = ModuleCategory.IP;

    readonly minLength   : number = 7;
    readonly maxLength   : number = 15;

    // just check for x.x.x.x
    readonly regex     ? : RegExp = /^(\d{1,3}\.){3}\d{1,3}$/;
}

module.exports = new IpQuery;

// Path: src/module/query/ip.query.ts
