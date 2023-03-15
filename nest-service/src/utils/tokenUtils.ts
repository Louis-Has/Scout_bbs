import { hashSync } from "bcryptjs";
import { currentTime } from "./timeUtils";

export function createToken(obj: { [key: string]: any }) {
    return hashSync(Object.values(obj).join(",") + currentTime(), 10).substring(10, 30);
}

export function caculateTokenTimeOut() {
    return currentTime() + 3 * 60 * 60 * 1000;
}