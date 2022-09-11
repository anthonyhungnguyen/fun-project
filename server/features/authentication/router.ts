import express, { Request, Response } from 'express';
const AuthenticationRouter = express.Router()

AuthenticationRouter.get('/publicKey', function (req: Request, res: Response) {
	res.send(process.env.PUBLIC_KEY)
})

export default AuthenticationRouter