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
exports.addProduct = exports.getAllProducts = exports.getWorkerByBranch = exports.addNewWorker = exports.getAllWorker = exports.addBranchToAdmin = exports.getBranchById = exports.getAllBranches = exports.deleteAdminAll = exports.deleteAdminById = exports.addNewAdmin = exports.getAllAdmins = exports.adminPreChecks = void 0;
const dataSource_1 = require("../dataSource");
const Admin_1 = require("../entity/Admin");
const Branch_1 = require("../entity/Branch");
const Worker_1 = require("../entity/Worker");
const Product_1 = require("../entity/Product");
const adminRepo = dataSource_1.appDataSource.getRepository(Admin_1.Admin);
const workerRepo = dataSource_1.appDataSource.getRepository(Worker_1.Worker);
const branchRepo = dataSource_1.appDataSource.getRepository(Branch_1.Branch);
const productRepo = dataSource_1.appDataSource.getRepository(Product_1.Product);
/**
 * Pre Checks
 */
const adminPreChecks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminId } = req.params;
    if (adminId) {
        const result = yield adminRepo.findOneBy({
            id: parseInt(req.params.id),
        });
        if (result) {
            next();
        }
        else {
            res.status(200).json({ message: 'No records present' });
        }
    }
    else {
        const result = yield adminRepo.find();
        if (result.length > 0) {
            next();
        }
        else {
            res.status(200).json({ message: 'No records present' });
        }
    }
});
exports.adminPreChecks = adminPreChecks;
/**
 *  Get all admins
 */
const getAllAdmins = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminRepo.find();
    res.status(200).json({ admin: result });
});
exports.getAllAdmins = getAllAdmins;
/**
 *  Add new admin
 */
const addNewAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const adminModel = req.body;
    const result = yield adminRepo.insert(adminModel);
    const insertResult = yield adminRepo.findOneBy({ id: result.raw.insertId });
    res.status(201).json({
        message: 'Admin added successfully',
        admin: insertResult,
    });
});
exports.addNewAdmin = addNewAdmin;
/**
 *  Delete admin by id
 */
const deleteAdminById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const adminId = req.params.id;
    const result = yield adminRepo.delete({ id: parseInt(adminId) });
    res.status(200).json({ message: `Admin deleted : id ${adminId}` });
});
exports.deleteAdminById = deleteAdminById;
/**
 * Delete all admin
 */
const deleteAdminAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adminRepo.delete({});
    res.status(200).json({ message: 'Deleted all admin successfully' });
});
exports.deleteAdminAll = deleteAdminAll;
/**
 * Branches
 * Get all branches
 */
const getAllBranches = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminId } = req.params;
    const result = yield adminRepo.findOneBy({ id: parseInt(adminId) });
    if (result != null) {
        res.status(200).json({
            admin_id: result.id,
            branches: result.branches,
        });
    }
    else {
        res.status(200).json({ message: 'No branches available' });
    }
});
exports.getAllBranches = getAllBranches;
/**
 *  Get Branch by Id
 */
const getBranchById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { branchId } = req.params;
    const result = branchRepo.findOneBy({ id: parseInt(branchId) });
    res.status(200).json({ branch: result });
});
exports.getBranchById = getBranchById;
/**
 * Add branch to admin
 */
const addBranchToAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const branch = req.body;
    const admin = yield adminRepo.findOneBy({ id: branch.admin.id });
    // insert new branch
    if (admin != null) {
        branch.admin = admin;
        const branchInsertResult = yield branchRepo.insert(branch);
        const branchResult = yield branchRepo.findOneBy({ id: parseInt(branchInsertResult.raw.insertId) });
        if (branchResult != null) {
            res.status(200).json({ message: 'Branch added successfully' });
        }
        else {
            res.status(200).json({ message: 'Failed to add branch' });
        }
    }
});
exports.addBranchToAdmin = addBranchToAdmin;
/**
 *  Worker
 *  Get all worker
 */
const getAllWorker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminId } = req.params;
    console.log("SHAZ - adminId >>> ", adminId);
    try {
        const result = yield workerRepo.find({
            where: { admin: { id: parseInt(adminId) } },
            relations: ['branch']
        });
        console.log(result);
        if (result.length > 0) {
            res.status(200).json({ worker: result });
        }
        else {
            res.status(200).json({
                message: 'No worker present',
                worker: [],
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch worker',
            error: error,
        });
    }
});
exports.getAllWorker = getAllWorker;
/**
 * Add new worker
 */
const addNewWorker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const worker = req.body;
    const admin = yield adminRepo.findOneBy({ id: worker.admin.id });
    if (admin != null) {
        worker.admin = admin;
    }
    else {
        return res.status(404).json({ message: 'Admin not found !' });
    }
    const result = yield workerRepo.insert(worker);
    const responseBody = yield workerRepo.findOneBy(result.raw.insertId);
    res.status(200).json({
        message: 'Worker added successfully',
        worker: responseBody,
    });
});
exports.addNewWorker = addNewWorker;
/**
 * Get worker by branch
 */
const getWorkerByBranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { branchId } = req.params;
    const result = workerRepo.findOneBy({
        branch: { id: parseInt(branchId) },
    });
    if (!result) {
        res.status(200).json({ worker: result });
    }
    else {
        res.status(200).json({ message: 'No worker present' });
    }
});
exports.getWorkerByBranch = getWorkerByBranch;
/**
 * Get all products
 */
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { adminId } = req.params;
    const result = productRepo.findOneBy({
        admin: { id: parseInt(adminId) }
    });
    if (!result) {
        res.status(200).json({ products: result });
    }
    else {
        res.status(200).json({ message: 'No products found' });
    }
});
exports.getAllProducts = getAllProducts;
/**
 * Add product
 */
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    const admin = yield adminRepo.findOneBy({ id: product.admin.id });
    if (admin != null) {
        product.admin = admin;
    }
    else {
        return res.status(404).json({ message: 'Admin not found !' });
    }
    const result = yield productRepo.insert(product);
    const responseBody = yield productRepo.findOneBy(result.raw.insertId);
    res.status(200).json({
        message: 'Product added successfully',
        product: responseBody,
    });
});
exports.addProduct = addProduct;
