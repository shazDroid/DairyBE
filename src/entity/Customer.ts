import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Branch } from "./Branch";
import { Admin } from "./Admin";

export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({
        type: 'enum',
        enum : Gender
    })
    gender: string

    @Column()
    address: string

    @Column({
        type: 'date'
    })
    subscriptionStart: Date

    @Column({
        type : 'date'
    })
    subscriptionEnd: Date
    
    @Column({
        type: 'date'
    })
    subscriptionRenew: Date

    @Column()
    package: string

    @ManyToOne(() => Admin, admin => admin.customers)
    @JoinColumn({
        name: 'admin_id',
        referencedColumnName: 'id'
    })
    admin: Admin

    @ManyToOne(() => Branch,branch => branch.customer)
    @JoinColumn({
        name : 'branch_id',
        referencedColumnName: 'id'
    })
    branch: Branch

    @CreateDateColumn({ type: 'timestamp'})
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date
}