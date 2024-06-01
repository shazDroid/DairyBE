import { Admin } from "../entity/Admin"
import { Customer } from "../entity/Customer"
import { State } from "../entity/State"
import { Worker } from "../entity/Worker"

export class Branch {
    branch_name: string
    branch_location: string
    admin: Admin
    state: State
    workers: Worker[]
}