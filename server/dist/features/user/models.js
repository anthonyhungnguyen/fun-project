"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const loaders_1 = __importDefault(require("../../loaders"));
class UserModel extends sequelize_1.Model {
}
UserModel.init({
    'username': {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    'password': {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    'createdAt': {
        type: sequelize_1.DataTypes.BIGINT
    },
    'updatedAt': {
        type: sequelize_1.DataTypes.BIGINT
    }
}, {
    tableName: 'user',
    timestamps: false,
    hooks: {
        beforeCreate: (user) => {
            user.setDataValue('createdAt', Math.floor(Date.now() / 1000));
        },
        beforeUpdate: (user) => {
            user.setDataValue('updatedAt', Math.floor(Date.now() / 1000));
        }
    }, sequelize: loaders_1.default.Sequelize
});
exports.default = UserModel;
