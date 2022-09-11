import crypto, { KeyPairKeyObjectResult } from 'crypto'

const CryptoUtils = {
	encodeBase64: (value: Buffer | string) => {
		return Buffer.from(value).toString('base64')
	},
	decodeBase64: (base64Value: string) => {
		return Buffer.from(base64Value, 'base64').toString('ascii')
	},
	sha2: (value: string): string => {
		const hash = crypto.createHash('sha512')
		const data = hash.update(value, 'utf-8')
		return data.digest('base64')
	},
	sign: (value: string, secret: string, algo: string) => {
		const hash = crypto.createHmac(algo, secret)
		return hash.update(value).digest('base64')

	},
	decrypt: (encryptedData: string, privateKey: string) => {
		const buffer = Buffer.from(encryptedData, 'base64')
		const decodedPrivateKey = Buffer.from(privateKey, 'base64').toString();
		return crypto.privateDecrypt({
			key: decodedPrivateKey,
			padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
		}, buffer).toString('ascii')
	},
	generateKeyPair: () => {
		const { publicKey, privateKey }: KeyPairKeyObjectResult = crypto.generateKeyPairSync("rsa", {
			modulusLength: 2048
		})

		return {
			'publicKey': CryptoUtils.encodeBase64(publicKey.export({
				type: 'pkcs1',
				format: 'pem'
			})),
			'privateKey': CryptoUtils.encodeBase64(privateKey.export({
				type: 'pkcs1',
				format: 'pem'
			}))
		}
	}
}
export default CryptoUtils