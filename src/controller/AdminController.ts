import express, { NextFunction, Request, Response } from 'express';
import { appDataSource } from '../dataSource';
import { Admin } from '../entity/Admin';
import { Branch } from '../entity/Branch';
import { Worker } from '../entity/Worker';
import { Product } from '../entity/Product';


const adminRepo = appDataSource.getRepository(Admin);
const workerRepo = appDataSource.getRepository(Worker);
const branchRepo = appDataSource.getRepository(Branch);
const productRepo = appDataSource.getRepository(Product);

/**
 * Pre Checks 
 */
export const adminPreChecks = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { adminId } = req.params;
    if (adminId) {
        const result = await adminRepo.findOneBy({
            id: parseInt(req.params.id),
        });
        if (result) {
            next();
        } else {
            res.status(200).json({ message: 'No records present' });
        }
    } else {
        const result = await adminRepo.find();
        if (result.length > 0) {
            next();
        } else {
            res.status(200).json({ message: 'No records present' });
        }
    }
};

/**
 *  Get all admins 
 */
export const getAllAdmins = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const result = await adminRepo.find();
    res.status(200).json({ admin: result });
};


/**
 *  Add new admin
 */
export const addNewAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const adminModel: Admin = req.body;
    const result = await adminRepo.insert(adminModel);
    const insertResult = await adminRepo.findOneBy({ id: result.raw.insertId });

    res.status(201).json({
        message: 'Admin added successfully',
        admin: insertResult,
    });
};

/**
 *  Delete admin by id
 */
export const deleteAdminById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const adminId: string = req.params.id;
    const result = await adminRepo.delete({ id: parseInt(adminId) });
    res.status(200).json({ message: `Admin deleted : id ${adminId}` });
};


/**
 * Delete all admin
 */
export const deleteAdminAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const result = await adminRepo.delete({});
    res.status(200).json({ message: 'Deleted all admin successfully' });
};



/**
 * Branches
 * Get all branches 
 */

export const getAllBranches = async (req: Request, res: Response) => {
    const { adminId } = req.params;

    const result = await adminRepo.findOneBy({ id: parseInt(adminId) });
    if (result != null) {
        res.status(200).json({
            admin_id: result.id,
            branches: result.branches,
        });
    } else {
        res.status(200).json({ message: 'No branches available' });
    }
};


/**
 *  Get Branch by Id 
 */
export const getBranchById = async (req: Request, res: Response) => {
    const { branchId } = req.params;

    const result = branchRepo.findOneBy({ id: parseInt(branchId) });
    res.status(200).json({ branch: result });
};


/**
 * Add branch to admin 
 */
export const addBranchToAdmin = async (req: Request, res: Response) => {
    const branch: Branch = req.body
    
    const admin = await adminRepo.findOneBy({ id:branch.admin.id });

    // insert new branch
    if(admin != null){
        branch.admin = admin
        const branchInsertResult = await branchRepo.insert(branch)
        const branchResult = await branchRepo.findOneBy({ id: parseInt(branchInsertResult.raw.insertId) });
        if (branchResult != null) {
            res.status(200).json({ message: 'Branch added successfully' });
        } else {
            res.status(200).json({ message: 'Failed to add branch' });
        }
    } 
};



/**
 *  Worker
 *  Get all worker
 */

export const getAllWorker = async (req: Request, res: Response) => {
    const { adminId } = req.params;
    try {
        const result = await workerRepo.find({
            where: { admin: { id: parseInt(adminId) } },
            relations: ['branch']
        });

        if (result.length > 0) {
            res.status(200).json({ worker: result });
        } else {
            res.status(200).json({
                message: 'No worker present',
                worker: [],
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch worker',
            error: error,
        });
    }
};


/**
 * Add new worker
 */
export const addNewWorker = async (req: Request, res: Response) => {
    const worker: Worker = req.body;
    const admin = await adminRepo.findOneBy({ id: worker.admin.id });

    if (admin != null) {
        worker.admin = admin;
    } else {
        return res.status(404).json({ message: 'Admin not found !' });
    }

    const result = await workerRepo.insert(worker);
    const responseBody = await workerRepo.findOneBy(result.raw.insertId);
    res.status(200).json({
        message: 'Worker added successfully',
        worker: responseBody,
    });
};


/**
 * Get worker by branch
 */
export const getWorkerByBranch = async (req: Request, res: Response) => {
    const { branchId } = req.params;
    const result = workerRepo.findOneBy({
        branch: { id: parseInt(branchId) },
    });

    if (!result) {
        res.status(200).json({ worker: result });
    } else {
        res.status(200).json({ message: 'No worker present' });
    }
};


/**
 * Get all products 
 */
export const getAllProducts = async (req: Request, res: Response) => {
    const { adminId } = req.params
    try{
        const result = await productRepo.find({
            where: { admin: { id: parseInt(adminId) } },
            relations: ["admin"]
        })
        console.log(result)
        if(result.length > 0){
            res.status(200).json({ products: result.map(({ admin, ...productWithoutAdmin }) => productWithoutAdmin) } )
        } else {
            res.status(200).json({ message: 'No products found' })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch products',
            error: error,
        });
    }
}

/**
 * Add product
 */
export const addProduct = async (req: Request, res: Response) => {
    const product: Product = req.body;
    const admin = await adminRepo.findOneBy({ id: product.admin.id });

    if (admin != null) {
        product.admin = admin;
    } else {
        return res.status(404).json({ message: 'Admin not found !' });
    }

    const result = await productRepo.insert(product);
    const responseBody = await productRepo.findOneBy(result.raw.insertId);
    res.status(200).json({
        message: 'Product added successfully',
        product: responseBody,
    });
}
