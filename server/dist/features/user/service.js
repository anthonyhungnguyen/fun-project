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
const crypto_1 = __importDefault(require("../../utils/crypto"));
const models_1 = __importDefault(require("./models"));
const UserService = {
    checkUserExist: function (username) {
        return __awaiter(this, void 0, void 0, function* () {
            return models_1.default.findByPk(username);
        });
    },
    createSession: function (username) {
        return __awaiter(this, void 0, void 0, function* () {
            // header, payload, sig
            const header = {
                'alg': 'HS256',
                'typ': 'JWT'
            };
            const payload = {
                iss: 'admin',
                iat: Math.floor(Date.now() / 1000),
                name: username,
            };
            const base64HeaderEncoded = crypto_1.default.encodeBase64(JSON.stringify(header));
            const base64PayloadEncoded = crypto_1.default.encodeBase64(JSON.stringify(payload));
            const concatedData = `${base64HeaderEncoded}.${base64PayloadEncoded}`;
            const sig = crypto_1.default.sign(concatedData, process.env.SECRET_KEY || 'abc123', 'sha256');
            console.log(header, payload, sig);
        });
    },
    login: function (username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            UserService.createSession(username);
        });
    },
    register: function (username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (username && password) {
                const userExist = yield UserService.checkUserExist(username);
                if (!userExist) {
                    const hashedPassword = crypto_1.default.sha2(username);
                    return models_1.default.create({
                        username, password: hashedPassword
                    });
                }
                else {
                    return Promise.reject('User already exists');
                }
            }
            return Promise.reject("Invalid register information");
        });
    }
};
exports.default = UserService;
