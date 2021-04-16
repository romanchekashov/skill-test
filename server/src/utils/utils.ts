import crypto from "crypto";

export const md5 = (text: string | number): string =>
    crypto.createHash('md5')
        .update(String(text), 'utf8')
        .digest('hex');

export const isProd = (): boolean => process.env.NODE_ENV === "production";