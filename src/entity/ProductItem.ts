import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./Product";
import { FoodType, ServeType } from "../utility/Enums";


@Entity()
export class ProductItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: string 

    @Column({ type: 'enum', enum: ServeType })
    serveType: ServeType 

    @Column({ type: 'enum', enum: FoodType })
    foodType: FoodType

    @ManyToMany(() => Product, product => product.productItem)
    @JoinTable({
        name : 'products_product_items',
        joinColumn: {
            name: 'product_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'product_item_id',
            referencedColumnName: 'id'
        }
    })
    product: Product

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type : 'timestamp' })
    updatedAt: Date
}