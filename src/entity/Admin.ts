import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { Branch } from './Branch';
import { Worker } from './Worker';
import { Product } from './Product';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  branch: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @OneToMany(() => Branch, branch => branch.admin)
  @JoinTable()
  branches: Branch[]

  @OneToMany(() => Worker, worker => worker.admin)
  worker: Worker[]

  @OneToMany(() => Product, product => product.admin)
  products: Product[]

  @CreateDateColumn({ type: 'timestamp' }) // Automatically generates createdAt timestamp on creation
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' }) // Automatically updates updatedAt timestamp on modification
  updatedAt: Date;
}
