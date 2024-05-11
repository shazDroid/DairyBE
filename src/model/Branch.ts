import { Admin } from "../entity/Admin"
import { Customer } from "../entity/Customer"
import { Package } from "../entity/Package"
import { State } from "../entity/State"
import { Supervisor } from "../entity/Supervisor"

export class Branch {
    branch_name: string
    branch_location: string
    admin: Admin
    state: State
    supervisiors: Supervisor[]
    packages: Package[]
}