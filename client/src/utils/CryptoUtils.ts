import NodeRSA from 'node-rsa';
import { Buffer } from 'buffer';

const CryptoUtils = {
  encodeBase64: function (value: string): string {
    return Buffer.from(value).toString('base64');
  },
  decodeBase64: function (value: string): string {
    return Buffer.from(value, 'base64').toString('ascii');
  },
  encryptRSA(value: string, publicKey: string): string | false {
    const nodeRSA = new NodeRSA();
    nodeRSA.importKey(publicKey);
    return nodeRSA.encrypt(value).toString('base64');
  },
};

export default CryptoUtils;
