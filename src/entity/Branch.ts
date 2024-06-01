import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { State } from "./State";
import { Admin } from "./Admin";
import { Worker } from "./Worker";
import { Customer } from "./Customer";

@Entity()
export class Branch {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    branch_name: string

    @Column()
    branch_location: string

    @ManyToOne(() => Admin, admin => admin.branches)
    @JoinColumn({
        name : "admin_id"
    })
    admin: Admin

    @ManyToOne(() => State, state => state.branch)
    @JoinColumn({ name : 'state_id' })
    state: State

    @OneToMany(() => Worker,worker => worker.branch)
    workers: Worker[]

    @OneToMany(() => Customer, customer => customer.branch)
    customer: Customer[]

    @CreateDateColumn({ type: 'timestamp'})
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date
}