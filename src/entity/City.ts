import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { State } from "./State";

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    city_name: string

    @ManyToOne(() => State, state => state.cities)
    @JoinColumn({ name: 'state_id' })
    state : State 

    @CreateDateColumn({ type: 'timestamp'})
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date
}