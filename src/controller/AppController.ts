import { Request, Response } from 'express';
import { appDataSource } from '../dataSource';
import { Admin } from '../entity/Admin';
import { Supervisor } from '../entity/Supervisor';
import { AdminModel } from '../model/Admin';
import { Branch } from '../entity/Branch';

const adminRepo = appDataSource.getRepository(Admin);
const supervisorRepo = appDataSource.getRepository(Supervisor);
const branchRepo = appDataSource.getRepository(Branch);

export const adminLogin = async (req: Request, res: Response) => {
    const { phone, password } = req.body;
    const adminResult = await adminRepo.find({
        where: { phone: phone, password: password },
    });
    const supervisorResult = await supervisorRepo.find({ where: { admin: { id: adminResult[0].id } } })
    const branchResult = await branchRepo.find({ where: { admin: {id : adminResult[0].id } } })

    if(adminResult.length > 0){
        const result = adminResult.map((item) => {
            const newItem = { ...item };
            newItem.supervisiors = supervisorResult
            newItem.branches = branchResult
            return newItem
        })
        res.status(200).json({ result })
    }
    
};

export const supervisorLogin = async (req: Request, res: Response) => {
    const { phone, password } = req.body;
};
