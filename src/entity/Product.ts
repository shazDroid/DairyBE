import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductItem } from "./ProductItem";
import { ServeType } from "../utility/Enums";
import { Package } from "./Package";
import { Admin } from "./Admin";



@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column({ type: 'enum', enum: ServeType })
    type: ServeType

    @Column({ default: false })
    isSpecial: boolean

    @Column({ default: false })
    isWeekendOnly: boolean

    @OneToOne(() => Admin, admin => admin.products)
    @JoinColumn({
        name: 'admin_id',
        referencedColumnName: 'id'
    })
    admin: Admin

    @OneToMany(() => ProductItem, productItem => productItem.product)
    productItem: ProductItem[]

    @OneToMany(() => Package, productPackage => productPackage.products)
    @JoinColumn({
        name: 'package_id',
        referencedColumnName:'id'
    })
    package: Package[]

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date
}