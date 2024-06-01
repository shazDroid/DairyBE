"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoute = void 0;
const express_1 = __importDefault(require("express"));
const AppController_1 = require("../controller/AppController");
exports.appRoute = express_1.default.Router();
exports.appRoute
    .post('/admin-login', AppController_1.adminLogin)
    .post('/supervisor-login');
