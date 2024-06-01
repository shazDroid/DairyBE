import express from "express"
import { getAllAdmins, addNewAdmin, adminPreChecks, deleteAdminById, deleteAdminAll, getAllBranches, getBranchById, getAllWorker, addNewWorker, getWorkerByBranch, addBranchToAdmin, getAllProducts, addProduct } from "../controller/AdminController"

export const adminRoute = express.Router()

// Routes
adminRoute
    // admin route
    .get("/admin", getAllAdmins)
    .post("/admin", addNewAdmin)
    .delete("/admin/:adminId",adminPreChecks, deleteAdminById)
    .delete("/admin/",adminPreChecks, deleteAdminAll)
    // Branches route
    .get("/admin/:adminId/branches",adminPreChecks, getAllBranches)
    .get("/admin/branch/:branchId",adminPreChecks, getBranchById)
    .post("/admin/branch",addBranchToAdmin)
    // worker route
    .get("/admin/worker/:adminId", getAllWorker)
    .get("/admin/worker/branch/:branchId", getWorkerByBranch)
    .post("/admin/worker",adminPreChecks, addNewWorker)
    // product route
    .get("/admin/product/:adminId", getAllProducts)
    .post("/admin/product", addProduct)


