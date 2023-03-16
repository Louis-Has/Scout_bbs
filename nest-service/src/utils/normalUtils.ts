import { randomUUID } from 'crypto';
import { snakeCase, transform } from 'lodash';
import { Types } from 'mongoose';

export function getUUID(length?: number) {
    const uuid = randomUUID().replace(/-/g, "");
    if (length) return uuid.substring(0, length);
    return uuid;
}

export function getObjectID(id: string) {
    if (!id) return undefined;
    return new Types.ObjectId(id);
}

export function isEmpty(value: any) {
    if (!value) return true;
    if (!Object.keys(value).length) return true;
    return false;
}

export function isNotEmpty(value: any) {
    return !isEmpty(value);
}

export function stringTransBoolean(value: string) {
    return value === "true";
}

export function snakeCaseObj(obj: object) {
    return transform(obj, (acc, value, key, target) => {
        const camelkey = Array.isArray(target) ? key: snakeCase(key);
        acc[camelkey] = value !== null && typeof value === 'object' ? snakeCaseObj(value): value;
    })
}