import { Request, Response } from 'express';
import { appDataSource } from '../dataSource';
import { Admin } from '../entity/Admin';
import { Worker } from '../entity/Worker';
import { AdminModel } from '../model/Admin';
import { Branch } from '../entity/Branch';

const adminRepo = appDataSource.getRepository(Admin);
const supervisorRepo = appDataSource.getRepository(Worker);
const branchRepo = appDataSource.getRepository(Branch);

export const adminLogin = async (req: Request, res: Response) => {
    const { phone, password } = req.body;
    const adminResult = await adminRepo.find({
        where: { phone: phone, password: password },
    });

    if(adminResult.length > 0){
        const supervisorResult = await supervisorRepo.find({ where: { admin: { id: adminResult[0].id } } })
        const branchResult = await branchRepo.find({ where: { admin: {id : adminResult[0].id } } })

        const result = adminResult.map((item) => {
            const newItem = { ...item };
            newItem.worker = supervisorResult.length > 0 ? supervisorResult : []
            newItem.branches = branchResult.length > 0 ? branchResult : []
            return newItem
        })

        res.status(200).json({ result })
    } else {
        res.status(404).json({ message: "Phone no or password Invalid, Please try again" })
    }
    
};

export const supervisorLogin = async (req: Request, res: Response) => {
    const { phone, password } = req.body;
};
