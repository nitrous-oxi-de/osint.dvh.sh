/*
 * @file iQueryStandardization.ts
 * @author David @dvhsh (https://dvh.sh)
 * @updated Thu Aug 9 2024
 * @description Interface for query standardization/validation
 */
import { ModuleCategory } from "@enum/eModuleCategory";

export default interface IQueryStandardization {

    readonly category    : ModuleCategory;

    readonly minLength   : number;
    readonly maxLength   : number;

    readonly regex     ? : RegExp;
}

// Path: src/module/query/email.query.ts
