import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { State } from "./State";
import { Admin } from "./Admin";
import { Supervisor } from "./Supervisor";
import { Customer } from "./Customer";
import { Package } from "./Package";

@Entity()
export class Branch {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    branch_name: string

    @Column()
    branch_location: string

    @ManyToMany(() => Admin, admin => admin.branches)
    admin: Admin

    @ManyToOne(() => State, state => state.branch)
    @JoinColumn({ name : 'state_id' })
    state: State

    @OneToMany(() => Supervisor,supervisor => supervisor.branch)
    supervisiors: Supervisor[]

    @OneToMany(() => Customer, customer => customer.branch)
    customer: Customer[]

    @OneToMany(() => Package, adminPackage => adminPackage.branch)
    packages: Package[]

    @CreateDateColumn({ type: 'timestamp'})
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date
}