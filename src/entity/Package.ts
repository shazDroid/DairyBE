import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Admin } from "./Admin";
import { Product } from "./Product";
import { Branch } from "./Branch";

@Entity()
export class Package {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @OneToOne(() => Admin, admin => admin.package)
    @JoinColumn({
        name: 'admin_id',
        referencedColumnName: 'id'
    })
    admin: Admin

    @ManyToMany(() => Branch, branch => branch.packages)
    @JoinTable({
        name:'branches_packages',
        joinColumn: {
            name: 'package_id',
            referencedColumnName:'id'
        },
        inverseJoinColumn: {
            name: 'branch_id',
            referencedColumnName:'id'
        }
    })
    branch: Branch

    @OneToMany(() => Product, product => product.package)
    products: Product[]

    @CreateDateColumn({ type: 'timestamp'})
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date
}