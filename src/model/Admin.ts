import { Worker } from "../entity/Worker";

export class AdminModel {
    id?: number;
    name?: string;
    branch?: string;
    phone?: string;
    password?: string;
    email?: string;
    workers: Worker[]
    subscriptionType?: string | null;
    subscriptionStart?: Date | null;
    subscriptionEnd?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
  }