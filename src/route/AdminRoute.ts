import express from "express"
import { getAllAdmins, addNewAdmin, preChecks, deleteAdminById, deleteAdminAll, getAllBranches, getBranchById, getAllSupervisor, addNewSupervisor, getSupervisorByBranch, addBranchToAdmin } from "../controller/AdminController"

export const adminRoute = express.Router()

// Routes
adminRoute
    // admin route
    .get("/admin", getAllAdmins)
    .post("/admin", addNewAdmin)
    .delete("/admin/:adminId",preChecks, deleteAdminById)
    .delete("/admin/",preChecks, deleteAdminAll)
    // Branches route
    .get("/admin/:adminId/branches", getAllBranches)
    .get("/admin/branch/:branchId", getBranchById)
    .post("/admin/:adminId/branch/:branchId", addBranchToAdmin)
    .post("/admin/branch", )
    // Supervisor route
    .get("/admin/supervisor/:adminId", getAllSupervisor)
    .get("/admin/supervisor/branch/:branchId", getSupervisorByBranch)
    .post("/admin/supervisor", addNewSupervisor)
    // product route


