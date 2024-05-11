import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { City } from "./City";
import { Branch } from "./Branch";

@Entity()
export class State {
    @PrimaryGeneratedColumn()
    id: number 

    @Column()
    state_name: string

    @OneToMany(() => City, city => city.state) // One State has many cities
    cities: City[];

    @OneToMany(() => Branch, branch => branch.state)
    branch: Branch

    @CreateDateColumn({ type: 'timestamp'})
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date
}