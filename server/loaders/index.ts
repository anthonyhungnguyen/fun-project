import dotenv from 'dotenv'
import mysql from 'mysql2'
import * as redis from 'redis'
import { Sequelize } from 'sequelize'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const mysqlClient = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	port: parseInt(process.env.MYSQL_PORT || '3306'),
	user: process.env.MYSQL_USERNAME,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
})

const redisClient = redis.createClient({
	url: process.env.REDIS_URL
})

const sequelizeClient = new Sequelize(process.env.MYSQL_DATABASE || '', process.env.MYSQL_USERNAME || '', process.env.MYSQL_PASSWORD || '', {
	host: process.env.MYSQL_HOST,
	port: parseInt(process.env.MYSQL_PORT || '3306'),
	dialect: 'mysql'
})

const Client = {
	MySQL: mysqlClient,
	Redis: redisClient,
	Sequelize: sequelizeClient
}

export default Client