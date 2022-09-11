import CryptoUtils from '../../utils/crypto';
import UserModel from './models';
const UserService = {
	checkUserExist: async function (username: string): Promise<UserModel | null> {
		return UserModel.findByPk(username)
	},
	createSession: async function (username: string) {
		// header, payload, sig
		const header = {
			'alg': 'HS256',
			'typ': 'JWT'
		}
		const payload = {
			iss: 'admin',
			iat: Math.floor(Date.now() / 1000),
			name: username,
		}
		const base64HeaderEncoded = CryptoUtils.encodeBase64(JSON.stringify(header))
		const base64PayloadEncoded = CryptoUtils.encodeBase64(JSON.stringify(payload))
		const concatedData = `${base64HeaderEncoded}.${base64PayloadEncoded}`
		const sig = CryptoUtils.sign(concatedData, process.env.SECRET_KEY || 'abc123', 'sha256')
		console.log(header, payload, sig)
	},
	login: async function (username: string, password: string) {
		UserService.createSession(username)
	},
	register: async function (username: string, password: string): Promise<string | UserModel> {
		if (username && password) {
			const userExist = await UserService.checkUserExist(username);
			if (!userExist) {
				const hashedPassword = CryptoUtils.sha2(username);
				return UserModel.create({
					username, password: hashedPassword
				})
			} else {
				return Promise.reject('User already exists')
			}
		}
		return Promise.reject("Invalid register information")
	}
}

export default UserService