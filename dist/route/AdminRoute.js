"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const express_1 = __importDefault(require("express"));
const AdminController_1 = require("../controller/AdminController");
exports.adminRoute = express_1.default.Router();
// Routes
exports.adminRoute
    // admin route
    .get("/admin", AdminController_1.getAllAdmins)
    .post("/admin", AdminController_1.addNewAdmin)
    .delete("/admin/:adminId", AdminController_1.adminPreChecks, AdminController_1.deleteAdminById)
    .delete("/admin/", AdminController_1.adminPreChecks, AdminController_1.deleteAdminAll)
    // Branches route
    .get("/admin/:adminId/branches", AdminController_1.adminPreChecks, AdminController_1.getAllBranches)
    .get("/admin/branch/:branchId", AdminController_1.adminPreChecks, AdminController_1.getBranchById)
    .post("/admin/branch", AdminController_1.addBranchToAdmin)
    // worker route
    .get("/admin/worker/:adminId", AdminController_1.adminPreChecks, AdminController_1.getAllWorker)
    .get("/admin/worker/branch/:branchId", AdminController_1.adminPreChecks, AdminController_1.getWorkerByBranch)
    .post("/admin/worker", AdminController_1.adminPreChecks, AdminController_1.addNewWorker)
    // product route
    .get("/admin/product/:adminId", AdminController_1.adminPreChecks, AdminController_1.getAllProducts)
    .post("/admin/product/addProduct", AdminController_1.addProduct);
