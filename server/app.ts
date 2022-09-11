import cors from 'cors'
import express, { Express } from 'express'
import AuthenticationRouter from './features/authentication/router'
import UserRouter from './features/user'
import Client from './loaders'
import CryptoUtils from './utils/crypto'

const app: Express = express()
const port = process.env.PORT
const mysqlConnect = () => {
	Client.MySQL.connect(function (err) {
		if (err) throw err;
		console.log('MySQL connected!')
	})

}
const redisConnect = () => {
	Client.Redis.connect()
	console.info("Redis connected!")
}
// console.log(CryptoUtils.generateKeyPair())
app.use(cors())
app.use(express.json())

app.use('/authentication', AuthenticationRouter)
app.use('/', UserRouter)

app.listen(port, () => {
	console.info(`App is listening on port ${port}`)
	mysqlConnect()
	redisConnect()
})