import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Branch } from "./Branch";
import { Admin } from "./Admin";

@Entity()
export class Supervisor {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    supervisor_name: string

    @Column()
    phone: number

    @Column()
    password: string

    @Column()
    email: string

    @ManyToOne(() => Branch, branch => branch.supervisiors)
    @JoinColumn({ name : 'branch_id' })
    branch: Branch

    @ManyToOne(() => Admin, admin => admin.supervisiors)
    @JoinColumn({
        name : "admin_id"
    })
    admin: Admin

    @CreateDateColumn({ type : "timestamp" })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date
}