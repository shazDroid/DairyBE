import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { Branch } from './Branch';
import { Supervisor } from './Supervisor';
import { Package } from './Package';
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

  @ManyToMany(() => Branch, branch => branch.admin)
  @JoinTable({
    name: 'admins_branches',
    joinColumn : {
      name: 'admin',
      referencedColumnName: 'id'
    },
    inverseJoinColumn : {
      name: 'branch',
      referencedColumnName: 'id'
    }
  })
  branches: Branch[]

  @OneToMany(() => Supervisor, supervisor => supervisor.admin)
  supervisiors: Supervisor[]

  @OneToMany(() => Package, adminPackage => adminPackage.admin)
  package: Package[]

  @OneToMany(() => Product, product => product.admin)
  products: Product[]

  @CreateDateColumn({ type: 'timestamp' }) // Automatically generates createdAt timestamp on creation
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' }) // Automatically updates updatedAt timestamp on modification
  updatedAt: Date;
}
