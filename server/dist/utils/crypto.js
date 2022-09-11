"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const CryptoUtils = {
    encodeBase64: (value) => {
        return Buffer.from(value).toString('base64');
    },
    decodeBase64: (base64Value) => {
        return Buffer.from(base64Value, 'base64').toString('ascii');
    },
    sha2: (value) => {
        const hash = crypto_1.default.createHash('sha512');
        const data = hash.update(value, 'utf-8');
        return data.digest('base64');
    },
    sign: (value, secret, algo) => {
        const hash = crypto_1.default.createHmac(algo, secret);
        return hash.update(value).digest('base64');
    },
    decrypt: (encryptedData, privateKey) => {
        const buffer = Buffer.from(encryptedData, 'base64');
        const decodedPrivateKey = Buffer.from(privateKey, 'base64').toString();
        return crypto_1.default.privateDecrypt({
            key: decodedPrivateKey,
            padding: crypto_1.default.constants.RSA_PKCS1_OAEP_PADDING,
        }, buffer).toString('ascii');
    },
    generateKeyPair: () => {
        const { publicKey, privateKey } = crypto_1.default.generateKeyPairSync("rsa", {
            modulusLength: 2048
        });
        return {
            'publicKey': CryptoUtils.encodeBase64(publicKey.export({
                type: 'pkcs1',
                format: 'pem'
            })),
            'privateKey': CryptoUtils.encodeBase64(privateKey.export({
                type: 'pkcs1',
                format: 'pem'
            }))
        };
    }
};
exports.default = CryptoUtils;
