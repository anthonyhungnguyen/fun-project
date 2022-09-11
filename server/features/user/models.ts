import { DataTypes, Model } from 'sequelize';
import Client from "../../loaders";
class UserModel extends Model {
	username: string | undefined;
	passowrd: string | undefined;
	createdAt: number | undefined;
	updatedAt: number | undefined
}
UserModel.init({
	'username': {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true
	},
	'password': {
		type: DataTypes.STRING,
		allowNull: false
	},
	'createdAt': {
		type: DataTypes.BIGINT
	},
	'updatedAt': {
		type: DataTypes.BIGINT
	}
}, {
	tableName: 'user',
	timestamps: false,
	hooks: {
		beforeCreate: (user) => {
			user.setDataValue('createdAt', Math.floor(Date.now() / 1000))
		},
		beforeUpdate: (user) => {
			user.setDataValue('updatedAt', Math.floor(Date.now() / 1000))
		}
	}, sequelize: Client.Sequelize
})

export default UserModel;