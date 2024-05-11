import express, { NextFunction, Request, Response } from 'express';
import { appDataSource } from '../dataSource';
import { Admin } from '../entity/Admin';
import { Branch } from '../entity/Branch';
import { Supervisor } from '../entity/Supervisor';

const adminRepo = appDataSource.getRepository(Admin);
const superVisiorRepo = appDataSource.getRepository(Supervisor);
const branchRepo = appDataSource.getRepository(Branch);

/**
 * Pre Checks 
 */
export const preChecks = async (
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
    const { adminId } = req.params;
    const branch: Branch = req.body
    
    const admin = await adminRepo.findOneBy({ id: parseInt(adminId) });

    // insert new branch 
    const branchInsertResult = await branchRepo.insert(branch)

    // bind branch with admin 
    if(branchInsertResult != null){
        const branchResult = await branchRepo.findOneBy({ id: parseInt(branchInsertResult.raw.insertId) });

        if (admin != null && branchResult != null) {
            admin.branches = [branch];
            const result = await adminRepo.save(admin);
    
            if (result != null) {
                res.status(200).json({ message: 'Branch added successfully' });
            } else {
                res.status(200).json({ message: 'Failed to add branch' });
            }
        } else {
            res.status(400).json({
                messsage: 'Admin not found or branch not found !',
            });
        }
    }
};



/**
 *  Supervisior
 *  Get all supervisor
 */

export const getAllSupervisor = async (req: Request, res: Response) => {
    const { adminId } = req.params;

    try {
        const result = await superVisiorRepo.find({
            where: { admin: { id: parseInt(adminId) } },
            relations: ['branch']
        });

        if (result.length > 0) {
            res.status(200).json({ supervisors: result });
        } else {
            res.status(200).json({
                message: 'No supervisors present',
                supervisors: [],
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch supervisors',
            error: error,
        });
    }
};


/**
 * Add new supervisor
 */
export const addNewSupervisor = async (req: Request, res: Response) => {
    const supervisor: Supervisor = req.body;
    const admin = await adminRepo.findOneBy({ id: supervisor.admin.id });

    if (admin != null) {
        supervisor.admin = admin;
    } else {
        return res.status(404).json({ message: 'Admin not found !' });
    }

    const result = await superVisiorRepo.insert(supervisor);
    const responseBody = await superVisiorRepo.findOneBy(result.raw.insertId);
    res.status(200).json({
        message: 'Supervisior added successfully',
        supervisior: responseBody,
    });
};


/**
 * Get supervisor by branch
 */
export const getSupervisorByBranch = async (req: Request, res: Response) => {
    const { branchId } = req.params;
    const result = superVisiorRepo.findOneBy({
        branch: { id: parseInt(branchId) },
    });

    if (!result) {
        res.status(200).json({ supervisor: result });
    } else {
        res.status(200).json({ message: 'No supervisor present' });
    }
};
