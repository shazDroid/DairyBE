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
Object.defineProperty(exports, "__esModule", { value: true });
exports.supervisorLogin = exports.adminLogin = void 0;
const dataSource_1 = require("../dataSource");
const Admin_1 = require("../entity/Admin");
const Worker_1 = require("../entity/Worker");
const Branch_1 = require("../entity/Branch");
const adminRepo = dataSource_1.appDataSource.getRepository(Admin_1.Admin);
const supervisorRepo = dataSource_1.appDataSource.getRepository(Worker_1.Worker);
const branchRepo = dataSource_1.appDataSource.getRepository(Branch_1.Branch);
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, password } = req.body;
    const adminResult = yield adminRepo.find({
        where: { phone: phone, password: password },
    });
    if (adminResult.length > 0) {
        const supervisorResult = yield supervisorRepo.find({ where: { admin: { id: adminResult[0].id } } });
        const branchResult = yield branchRepo.find({ where: { admin: { id: adminResult[0].id } } });
        const result = adminResult.map((item) => {
            const newItem = Object.assign({}, item);
            newItem.worker = supervisorResult.length > 0 ? supervisorResult : [];
            newItem.branches = branchResult.length > 0 ? branchResult : [];
            return newItem;
        });
        res.status(200).json({ result });
    }
    else {
        res.status(404).json({ message: "Phone no or password Invalid, Please try again" });
    }
});
exports.adminLogin = adminLogin;
const supervisorLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, password } = req.body;
});
exports.supervisorLogin = supervisorLogin;
