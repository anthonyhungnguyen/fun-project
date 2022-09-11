"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("../../utils/crypto"));
const models_1 = __importDefault(require("./models"));
const service_1 = __importDefault(require("./service"));
const UserRouter = express_1.default.Router();
UserRouter.post('/login', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { encryptedLoginInfo } = req.body;
        const decryptedLoginInfoStr = crypto_1.default.decrypt(encryptedLoginInfo, process.env.PRIVATE_KEY || '');
        const { username, password } = JSON.parse(decryptedLoginInfoStr);
        console.log(username, password);
        try {
            service_1.default.login(username, password);
        }
        catch (e) {
        }
    });
});
UserRouter.post('/register', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { encryptedRegisterInfo } = req.body;
        const decryptedRegisterInfoStr = crypto_1.default.decrypt(encryptedRegisterInfo, process.env.PRIVATE_KEY || '');
        const { username, password } = JSON.parse(decryptedRegisterInfoStr);
        try {
            const result = yield service_1.default.register(username, password);
            if (result instanceof models_1.default) {
                return res.status(200);
            }
            else {
                return res.status(400).send(result);
            }
        }
        catch (e) {
            return res.status(500).send(e);
        }
    });
});
exports.default = UserRouter;
