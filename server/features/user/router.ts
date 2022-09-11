import express, { Request, Response } from 'express';
import CryptoUtils from '../../utils/crypto';
import UserModel from './models';
import UserService from './service';
const UserRouter = express.Router()

UserRouter.post('/login', async function (req: Request, res: Response) {
	const { encryptedLoginInfo } = req.body
	const decryptedLoginInfoStr = CryptoUtils.decrypt(encryptedLoginInfo, process.env.PRIVATE_KEY || '');
	const { username, password } = JSON.parse(decryptedLoginInfoStr)
	console.log(username, password)
	try {
		UserService.login(username, password)
	} catch (e) {

	}
})

UserRouter.post('/register', async function (req: Request, res: Response) {
	const { encryptedRegisterInfo } = req.body
	const decryptedRegisterInfoStr = CryptoUtils.decrypt(encryptedRegisterInfo, process.env.PRIVATE_KEY || '')
	const { username, password } = JSON.parse(decryptedRegisterInfoStr)
	try {
		const result = await UserService.register(username, password);
		if (result instanceof UserModel) {
			return res.status(200)
		} else {
			return res.status(400).send(result)
		}
	} catch (e) {
		return res.status(500).send(e)
	}
})

export default UserRouter