import { Admin } from "../entity/Admin"
import { Branch } from "./Branch"

export class Supervisior {
    id: number
    supervisor_name: string
    phone: number
    password: string
    email: string
    branch: Branch
    admin: Admin
    createdAt: Date
    updatedAt: Date
}