import { Supervisor } from "../entity/Supervisor";

export class AdminModel {
    id?: number;
    name?: string;
    branch?: string;
    phone?: string;
    password?: string;
    email?: string;
    supervisiors: Supervisor[]
    subscriptionType?: string | null;
    subscriptionStart?: Date | null;
    subscriptionEnd?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
  }