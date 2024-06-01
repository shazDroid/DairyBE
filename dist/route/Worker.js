"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workerRoute = void 0;
const express_1 = __importDefault(require("express"));
exports.workerRoute = express_1.default.Router();
exports.workerRoute
    .get("/worker/admin/:adminId");
