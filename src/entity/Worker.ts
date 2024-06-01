import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Branch } from "./Branch";
import { Admin } from "./Admin";

@Entity()
export class Worker {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    worker_name: string

    @Column()
    phone: number

    @Column()
    password: string

    @Column()
    email: string

    @ManyToOne(() => Branch, branch => branch.workers)
    @JoinColumn({ name : 'branch_id' })
    branch: Branch

    @ManyToOne(() => Admin, admin => admin.worker)
    @JoinColumn({
        name : "admin_id"
    })
    admin: Admin

    @CreateDateColumn({ type : "timestamp" })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date
}