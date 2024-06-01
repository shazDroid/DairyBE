import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Unit } from "../utility/Enums";
import { Admin } from "./Admin";



@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column({ type: 'enum', enum: Unit })
    unit: Unit

    @ManyToOne(() => Admin, admin => admin.products)
    @JoinColumn({
        name : "admin_id"
    })
    admin: Admin

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date
}