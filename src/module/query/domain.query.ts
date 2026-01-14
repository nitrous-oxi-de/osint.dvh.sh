/*
 * @file domain.query.ts
 * @author David @dvhsh (https://dvh.sh)
 * @updated Thu Aug 9 2024
 * @description Domain query standardization bounding
 */
import IQueryStandardization from "@interface/iQueryStandardization";
import { ModuleCategory }    from "@enum/eModuleCategory";

export default class DomainQuery implements IQueryStandardization {

    readonly category    : ModuleCategory = ModuleCategory.Domain;

    readonly minLength   : number = 3;
    readonly maxLength   : number = 255;

    readonly regex     ? : RegExp = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;
}

module.exports = new DomainQuery;

// Path: src/module/query/domain.query.ts
