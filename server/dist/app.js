"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./features/authentication/router"));
const user_1 = __importDefault(require("./features/user"));
const loaders_1 = __importDefault(require("./loaders"));
const app = (0, express_1.default)();
const port = process.env.PORT;
const mysqlConnect = () => {
    loaders_1.default.MySQL.connect(function (err) {
        if (err)
            throw err;
        console.log('MySQL connected!');
    });
};
const redisConnect = () => {
    loaders_1.default.Redis.connect();
    console.info("Redis connected!");
};
// console.log(CryptoUtils.generateKeyPair())
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/authentication', router_1.default);
app.use('/', user_1.default);
app.listen(port, () => {
    console.info(`App is listening on port ${port}`);
    mysqlConnect();
    redisConnect();
});
